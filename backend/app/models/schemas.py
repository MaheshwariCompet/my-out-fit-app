from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime, date

class UserProfile(BaseModel):
    id: str
    email: str
    full_name: str = "Elena Rostova"
    avatar_url: Optional[str] = None
    is_guest: bool = False
    primary_focus: str = "Smart Everyday"
    show_body_shape_labels: bool = False
    enable_ease_allowance: bool = True
    ease_allowance_cm: float = 2.0

class UserSettings(BaseModel):
    language: str = "en-US"
    dimension_unit: str = "metric"
    temperature_unit: str = "celsius"
    currency: str = "USD"
    sizing_standard: str = "EU"
    theme: str = "light"
    default_starting_view: str = "home"
    haptic_feedback: bool = True
    reduced_motion: bool = False
    auto_play_spins: bool = True
    high_contrast: bool = False
    morning_outfit_inspiration: bool = True
    dispatch_hour: str = "07:30"
    evening_outfit_checkin: bool = True
    laundry_reminders: bool = True
    resting_fiber_alerts: bool = False
    upcoming_voyage_alerts: bool = True
    trial_reminder: bool = True
    mindful_cooldown_enabled: bool = True
    cooldown_hours: int = 24

class BiometricsData(BaseModel):
    height_cm: float = 174.0
    bust_cm: float = 86.0
    waist_cm: float = 68.0
    high_hip_cm: float = 94.0
    inseam_cm: float = 79.0
    shoulder_width_cm: float = 40.0
    harmonic_index: float = 0.72
    avatar_mesh_calibrated: bool = True

class ClosetItem(BaseModel):
    id: str
    title: str
    brand: Optional[str] = None
    category: str = "tops"
    status: str = "ready"
    color_name: Optional[str] = None
    color_hex: Optional[str] = None
    seasonality: List[str] = ["Autumn", "Winter"]
    fabric_composition: Optional[str] = None
    care_instructions: Optional[str] = None
    rest_period_hours: int = 0
    purchase_price: float = 0.0
    wear_count: int = 0
    last_worn_at: Optional[date] = None
    is_favorite: bool = False
    is_archived: bool = False
    image_url: Optional[str] = None

class ClosetItemCreate(BaseModel):
    title: str
    brand: Optional[str] = None
    category: str = "tops"
    status: str = "ready"
    color_name: Optional[str] = None
    color_hex: Optional[str] = None
    seasonality: List[str] = ["Autumn", "Winter"]
    fabric_composition: Optional[str] = None
    care_instructions: Optional[str] = None
    purchase_price: float = 0.0
    image_url: Optional[str] = None

class Outfit(BaseModel):
    id: str
    title: str
    occasion: Optional[str] = None
    notes: Optional[str] = None
    synergy_score: int = 95
    comfort_rating: float = 9.8
    is_saved: bool = False
    collection_tag: str = "All"
    items: List[ClosetItem] = []

class PlanDay(BaseModel):
    id: str
    date: str
    agenda_title: Optional[str] = None
    weather_summary: Optional[str] = None
    outfit: Optional[Outfit] = None
    is_worn: bool = False

class PlannerPlan(BaseModel):
    id: str
    title: str
    archetype: str = "Weekly Rotation"
    start_date: str
    end_date: str
    is_active: bool = False
    days: List[PlanDay] = []

class WearLogEntry(BaseModel):
    id: str
    date: str
    outfit_id: Optional[str] = None
    context_title: str
    weather_summary: str
    streak_count: int = 12

class FitNote(BaseModel):
    id: str
    item_id: str
    alterations: List[str] = []
    waist_balance_calibration: int = 0
    drape_notes: Optional[str] = None
    tailor_studio: Optional[str] = None
    tailor_fee: float = 0.0

class WishlistItem(BaseModel):
    id: str
    title: str
    brand: Optional[str] = None
    product_url: Optional[str] = None
    image_url: Optional[str] = None
    price: float
    pairs_count: int = 0
    cooldown_hours: int = 24
    cooldown_expires_at: datetime
    can_purchase: bool = False

class TravelPackingItem(BaseModel):
    id: str
    item_title: str
    category: str
    weight_kg: float
    is_packed: bool = False

class TravelPackingList(BaseModel):
    id: str
    destination: str
    start_date: str
    end_date: str
    baggage_allowance_kg: float = 10.0
    travel_vibe: str = "Business & Leisure"
    items: List[TravelPackingItem] = []

class NotificationItem(BaseModel):
    id: str
    title: str
    body: str
    category: str = "curation"
    action_url: Optional[str] = None
    is_read: bool = False
    created_at: str
