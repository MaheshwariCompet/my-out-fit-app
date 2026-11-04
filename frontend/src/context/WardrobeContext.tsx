import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface Garment {
  id: string;
  user_id?: string;
  title: string;
  brand: string;
  category: 'outerwear' | 'tops' | 'bottoms' | 'knitwear' | 'footwear' | 'accessories';
  status: 'ready' | 'in_laundry' | 'dry_clean';
  purchase_price: number;
  wear_count: number;
  color_name: string;
  fabric_composition: string;
  image_url: string;
  care_instructions?: string;
}

export interface Outfit {
  id: string;
  user_id?: string;
  title: string;
  occasion: string;
  notes: string;
  synergy_score: number;
  comfort_rating: number;
  is_saved: boolean;
  pieces: Garment[];
}

interface WardrobeContextType {
  garments: Garment[];
  outfits: Outfit[];
  activeOutfit: Outfit | null;
  streakCount: number;
  hasWornToday: boolean;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  markWornToday: (outfitId: string) => Promise<void>;
  addGarment: (garment: Omit<Garment, 'id' | 'wear_count'>, imageFile?: File) => Promise<void>;
  deleteGarment: (garmentId: string) => Promise<void>;
  swapGarmentInOutfit: (outfitId: string, oldGarmentId: string, newGarmentId: Garment) => Promise<void>;
  toggleSaveOutfit: (outfitId: string, currentStatus: boolean) => Promise<void>;
  selectOutfitForTryOn: (outfit: Outfit) => void;
}

const WardrobeContext = createContext<WardrobeContextType | null>(null);

export const WardrobeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [garments, setGarments] = useState<Garment[]>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [activeOutfit, setActiveOutfit] = useState<Outfit | null>(null);
  const [streakCount, setStreakCount] = useState<number>(0);
  const [hasWornToday, setHasWornToday] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback demo user ID if session is unauthenticated
  const DEMO_USER_ID = '00000000-0000-0000-0000-000000000001';

  const getEffectiveUserId = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user?.id || DEMO_USER_ID;
  }, []);

  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = await getEffectiveUserId();

      // 1. Fetch live garments from closet_items table
      const { data: garmentRows, error: garmentErr } = await supabase
        .from('closet_items')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (garmentErr) throw garmentErr;

      const formattedGarments: Garment[] = (garmentRows || []).map((row) => ({
        id: row.id,
        user_id: row.user_id,
        title: row.title,
        brand: row.brand || '',
        category: row.category,
        status: row.status,
        purchase_price: Number(row.purchase_price) || 0,
        wear_count: row.wear_count || 0,
        color_name: row.color_name || '',
        fabric_composition: row.fabric_composition || '',
        care_instructions: row.care_instructions || '',
        image_url: row.image_url || 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80',
      }));

      setGarments(formattedGarments);

      // 2. Fetch live outfits with their linked garment relations
      const { data: outfitRows, error: outfitErr } = await supabase
        .from('outfits')
        .select(`
          id,
          user_id,
          title,
          occasion,
          notes,
          synergy_score,
          comfort_rating,
          is_saved,
          outfit_items (
            item_id,
            layer_order
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (outfitErr) throw outfitErr;

      const garmentMap = new Map(formattedGarments.map((g) => [g.id, g]));

      const formattedOutfits: Outfit[] = (outfitRows || []).map((row) => {
        const sortedPieces = (row.outfit_items || [])
          .sort((a: any, b: any) => (a.layer_order || 0) - (b.layer_order || 0))
          .map((oi: any) => garmentMap.get(oi.item_id))
          .filter((g): g is Garment => Boolean(g));

        return {
          id: row.id,
          user_id: row.user_id,
          title: row.title,
          occasion: row.occasion || 'Everyday',
          notes: row.notes || '',
          synergy_score: row.synergy_score || 90,
          comfort_rating: Number(row.comfort_rating) || 9.0,
          is_saved: Boolean(row.is_saved),
          pieces: sortedPieces,
        };
      });

      setOutfits(formattedOutfits);
      if (formattedOutfits.length > 0 && !activeOutfit) {
        setActiveOutfit(formattedOutfits[0]);
      }

      // 3. Fetch wear history and streak metrics
      const todayISO = new Date().toISOString().split('T')[0];
      const { data: wearRows } = await supabase
        .from('wear_history')
        .select('date, streak_count')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .limit(1);

      if (wearRows && wearRows.length > 0) {
        setStreakCount(wearRows[0].streak_count || 1);
        setHasWornToday(wearRows[0].date === todayISO);
      } else {
        setStreakCount(0);
        setHasWornToday(false);
      }
    } catch (err: any) {
      console.error('Database sync error in WardrobeContext:', err);
      setError(err.message || 'Failed to sync with Supabase');
    } finally {
      setLoading(false);
    }
  }, [getEffectiveUserId, activeOutfit]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Insert a real garment record into Supabase
  const addGarment = async (
    item: Omit<Garment, 'id' | 'wear_count'>,
    imageFile?: File
  ) => {
    const userId = await getEffectiveUserId();
    let finalImageUrl = item.image_url;

    // Upload image to the Supabase 'garments' bucket if a file was selected
    if (imageFile) {
      const filePath = `${userId}/${Date.now()}_${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('garments')
        .upload(filePath, imageFile, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('garments')
        .getPublicUrl(filePath);

      finalImageUrl = publicUrlData.publicUrl;
    }

    const { error: insertError } = await supabase.from('closet_items').insert({
      user_id: userId,
      title: item.title,
      brand: item.brand,
      category: item.category,
      status: item.status,
      purchase_price: item.purchase_price,
      color_name: item.color_name,
      fabric_composition: item.fabric_composition,
      care_instructions: item.care_instructions,
      image_url: finalImageUrl,
    });

    if (insertError) throw insertError;
    await refreshData();
  };

  // Delete garment record from Supabase
  const deleteGarment = async (garmentId: string) => {
    const { error: delError } = await supabase
      .from('closet_items')
      .delete()
      .eq('id', garmentId);

    if (delError) throw delError;
    await refreshData();
  };

  // Swap garment in database outfit_items relational table
  const swapGarmentInOutfit = async (
    outfitId: string,
    oldGarmentId: string,
    newGarmentId: Garment
  ) => {
    const { error: updateError } = await supabase
      .from('outfit_items')
      .update({ item_id: newGarmentId })
      .match({ outfit_id: outfitId, item_id: oldGarmentId });

    if (updateError) {
      // If no direct row was updated, insert the new association
      await supabase.from('outfit_items').insert({
        outfit_id: outfitId,
        item_id: newGarmentId,
        layer_order: 1,
      });
    }

    await refreshData();
  };

  // Update outfit bookmark state in database
  const toggleSaveOutfit = async (outfitId: string, currentStatus: boolean) => {
    const { error: updateError } = await supabase
      .from('outfits')
      .update({ is_saved: !currentStatus })
      .eq('id', outfitId);

    if (updateError) throw updateError;
    await refreshData();
  };

  // Record an outfit wearing event and update streak count
  const markWornToday = async (outfitId: string) => {
    if (hasWornToday) return;

    const userId = await getEffectiveUserId();
    const todayISO = new Date().toISOString().split('T')[0];
    const newStreak = streakCount + 1;

    const { error: wearErr } = await supabase.from('wear_history').insert({
      user_id: userId,
      outfit_id: outfitId,
      date: todayISO,
      context_title: 'Daily Wear Confirmation',
      weather_summary: '18°C Mild',
      rating: 5,
      streak_count: newStreak,
    });

    if (wearErr) throw wearErr;

    // Increment wear counts on the associated garments
    const targetedOutfit = outfits.find((o) => o.id === outfitId);
    if (targetedOutfit && targetedOutfit.pieces.length > 0) {
      for (const piece of targetedOutfit.pieces) {
        await supabase
          .from('closet_items')
          .update({ wear_count: (piece.wear_count || 0) + 1 })
          .eq('id', piece.id);
      }
    }

    setHasWornToday(true);
    setStreakCount(newStreak);
    await refreshData();
  };

  const selectOutfitForTryOn = (outfit: Outfit) => {
    setActiveOutfit(outfit);
  };

  return (
    <WardrobeContext.Provider
      value={{
        garments,
        outfits,
        activeOutfit,
        streakCount,
        hasWornToday,
        loading,
        error,
        refreshData,
        markWornToday,
        addGarment,
        deleteGarment,
        swapGarmentInOutfit,
        toggleSaveOutfit,
        selectOutfitForTryOn,
      }}
    >
      {children}
    </WardrobeContext.Provider>
  );
};

export const useWardrobe = () => {
  const context = useContext(WardrobeContext);
  if (!context) {
    throw new Error('useWardrobe must be used within a WardrobeProvider');
  }
  return context;
};