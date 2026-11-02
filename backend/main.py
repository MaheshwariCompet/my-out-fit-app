from fastapi import FastAPI, Depends, Request, UploadFile, File, Form, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, StreamingResponse
from typing import List, Optional
import io
from datetime import datetime, timezone, timedelta

from app.core.config import settings
from app.core.auth import get_current_user, CurrentUser
from app.core.rate_limit import rate_limiter
from app.models.schemas import (
    UserProfile, UserSettings, BiometricsData, ClosetItem, ClosetItemCreate,
    Outfit, PlannerPlan, PlanDay, WearLogEntry, FitNote, WishlistItem,
    TravelPackingList, TravelPackingItem, NotificationItem
)
from app.services.tryon_engine import TryOnEngineInterface, TryOnResult
from app.services.prepurchase import PrePurchaseService, PrePurchaseAuditResult
from app.services.export_generator import ExportService

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    docs_url=f"{settings.API_V1_STR}/docs",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MOCK_ITEMS = [
    {
        "id": "item-1",
        "title": "Tailored Camel Wool Coat",
        "brand": "Totême",
        "category": "outerwear",
        "status": "ready",
        "color_name": "Camel Tan",
        "color_hex": "#C48A58",
        "seasonality": ["Autumn", "Winter"],
        "fabric_composition": "100% Italian Virgin Wool (Cupro Lining)",
        "care_instructions": "Specialist Dry Clean Only • Rest 48h between wears",
        "purchase_price": 580.0,
        "wear_count": 38,
        "is_favorite": True,
        "image_url": "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "item-2",
        "title": "Pleated Virgin Wool Trousers",
        "brand": "Studio Nicholson",
        "category": "bottoms",
        "status": "ready",
        "color_name": "Charcoal Melange",
        "color_hex": "#36383E",
        "seasonality": ["Autumn", "Winter", "Spring"],
        "fabric_composition": "Italian Virgin Wool",
        "care_instructions": "Dry Clean Only",
        "purchase_price": 360.0,
        "wear_count": 38,
        "is_favorite": True,
        "image_url": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "item-3",
        "title": "Cashmere Crewneck",
        "brand": "Arket",
        "category": "knitwear",
        "status": "ready",
        "color_name": "Oatmeal",
        "color_hex": "#DED3C4",
        "seasonality": ["Autumn", "Winter", "Spring"],
        "fabric_composition": "100% Mongolian Cashmere",
        "care_instructions": "Hand wash cold or gentle wool cycle",
        "purchase_price": 150.0,
        "wear_count": 54,
        "is_favorite": True,
        "image_url": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "item-4",
        "title": "Relaxed Linen Overshirt",
        "brand": "COS",
        "category": "tops",
        "status": "in_laundry",
        "color_name": "Ecru Linen",
        "color_hex": "#E3DDD5",
        "seasonality": ["Spring", "Summer", "Autumn"],
        "fabric_composition": "Pure French Linen",
        "care_instructions": "Machine wash gentle 30°C",
        "purchase_price": 95.0,
        "wear_count": 24,
        "is_favorite": False,
        "image_url": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "item-5",
        "title": "Japanese Selvedge Denim",
        "brand": "Kuroki Mill",
        "category": "bottoms",
        "status": "ready",
        "color_name": "Indigo Raw",
        "color_hex": "#1F2937",
        "seasonality": ["All-Year"],
        "fabric_composition": "13.5oz Kuroki Mill Cotton",
        "care_instructions": "Cold soak inside out",
        "purchase_price": 185.0,
        "wear_count": 42,
        "is_favorite": True,
        "image_url": "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "item-6",
        "title": "Suede Penny Loafers",
        "brand": "Totême",
        "category": "footwear",
        "status": "ready",
        "color_name": "Tobacco Brown",
        "color_hex": "#7C482B",
        "seasonality": ["Spring", "Autumn"],
        "fabric_composition": "Calfskin Suede & Leather Sole",
        "care_instructions": "Suede brush & protectant spray",
        "purchase_price": 220.0,
        "wear_count": 42,
        "is_favorite": False,
        "image_url": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80"
    }
]

@app.get("/health")
async def health_check():
    return {"status": "ok", "app": "MyOutFit API", "version": "1.0.0"}

@app.get(f"{settings.API_V1_STR}/profile", response_model=UserProfile)
async def get_profile(current_user: CurrentUser = Depends(get_current_user)):
    return UserProfile(
        id=current_user.id,
        email=current_user.email,
        full_name="Elena Rostova",
        is_guest=current_user.is_guest,
        show_body_shape_labels=False
    )

@app.delete(f"{settings.API_V1_STR}/profile")
async def delete_account(current_user: CurrentUser = Depends(get_current_user)):
    return {"status": "account_purged", "message": "All garments, measurements, and history irrevocably erased."}

@app.get(f"{settings.API_V1_STR}/settings", response_model=UserSettings)
async def get_settings(current_user: CurrentUser = Depends(get_current_user)):
    return UserSettings()

@app.put(f"{settings.API_V1_STR}/settings", response_model=UserSettings)
async def update_settings(settings_update: UserSettings, current_user: CurrentUser = Depends(get_current_user)):
    return settings_update

@app.get(f"{settings.API_V1_STR}/biometrics", response_model=BiometricsData)
async def get_biometrics(current_user: CurrentUser = Depends(get_current_user)):
    return BiometricsData()

@app.put(f"{settings.API_V1_STR}/biometrics", response_model=BiometricsData)
async def update_biometrics(biometrics: BiometricsData, current_user: CurrentUser = Depends(get_current_user)):
    return biometrics

@app.get(f"{settings.API_V1_STR}/closet", response_model=List[ClosetItem])
async def list_closet_items(
    category: Optional[str] = None,
    status: Optional[str] = None,
    q: Optional[str] = None,
    current_user: CurrentUser = Depends(get_current_user)
):
    items = MOCK_ITEMS
    if category and category != "all":
        items = [i for i in items if i["category"] == category]
    if status and status != "all":
        items = [i for i in items if i["status"] == status]
    if q:
        items = [i for i in items if q.lower() in i["title"].lower() or q.lower() in (i.get("brand") or "").lower()]
    return items

@app.post(f"{settings.API_V1_STR}/closet", response_model=ClosetItem, status_code=status.HTTP_201_CREATED)
async def create_closet_item(
    item_in: ClosetItemCreate,
    current_user: CurrentUser = Depends(get_current_user)
):
    new_item = {
        "id": f"item-{len(MOCK_ITEMS) + 1}",
        "title": item_in.title,
        "brand": item_in.brand,
        "category": item_in.category,
        "status": item_in.status,
        "color_name": item_in.color_name or "Neutral",
        "color_hex": item_in.color_hex or "#FAF8F5",
        "seasonality": item_in.seasonality,
        "fabric_composition": item_in.fabric_composition or "100% Cotton",
        "care_instructions": item_in.care_instructions or "Standard Care",
        "purchase_price": item_in.purchase_price,
        "wear_count": 0,
        "is_favorite": False,
        "image_url": item_in.image_url or "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80"
    }
    MOCK_ITEMS.append(new_item)
    return new_item

@app.get(f"{settings.API_V1_STR}/closet/{{item_id}}", response_model=ClosetItem)
async def get_closet_item(item_id: str, current_user: CurrentUser = Depends(get_current_user)):
    item = next((i for i in MOCK_ITEMS if i["id"] == item_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Garment not found")
    return item

@app.put(f"{settings.API_V1_STR}/closet/{{item_id}}", response_model=ClosetItem)
async def update_closet_item(item_id: str, item_in: ClosetItemCreate, current_user: CurrentUser = Depends(get_current_user)):
    item = next((i for i in MOCK_ITEMS if i["id"] == item_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Garment not found")
    item.update(item_in.model_dump(exclude_unset=True))
    return item

@app.delete(f"{settings.API_V1_STR}/closet/{{item_id}}")
async def delete_closet_item(item_id: str, current_user: CurrentUser = Depends(get_current_user)):
    global MOCK_ITEMS
    MOCK_ITEMS = [i for i in MOCK_ITEMS if i["id"] != item_id]
    return {"status": "deleted", "id": item_id}

@app.post(f"{settings.API_V1_STR}/upload/garment")
async def upload_garment(file: UploadFile = File(...), auto_remove_bg: bool = Form(True)):
    return {
        "file_name": file.filename,
        "image_url": "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
        "background_removed": auto_remove_bg
    }

@app.get(f"{settings.API_V1_STR}/outfits/saved", response_model=List[Outfit])
async def get_saved_outfits(current_user: CurrentUser = Depends(get_current_user)):
    return [
        Outfit(
            id="outfit-1",
            title="The Boardroom Sartorial",
            occasion="Business / Work",
            notes="Tailored camel coat, cashmere crewneck and pleated trousers.",
            synergy_score=96,
            comfort_rating=9.8,
            is_saved=True,
            collection_tag="Autumn Workwear",
            items=[ClosetItem(**MOCK_ITEMS[0]), ClosetItem(**MOCK_ITEMS[1]), ClosetItem(**MOCK_ITEMS[2])]
        ),
        Outfit(
            id="outfit-2",
            title="Relaxed Tailored Capsule",
            occasion="Casual Friday",
            notes="Cashmere knit with raw selvedge denim.",
            synergy_score=94,
            comfort_rating=9.5,
            is_saved=True,
            collection_tag="Weekend Casual",
            items=[ClosetItem(**MOCK_ITEMS[2]), ClosetItem(**MOCK_ITEMS[4])]
        )
    ]

@app.get(f"{settings.API_V1_STR}/planner/today")
async def get_today_outfit(current_user: CurrentUser = Depends(get_current_user)):
    return {
        "date": "Wednesday, Oct 25",
        "weather": "18°C Mild Overcast",
        "outfit": {
            "id": "outfit-hero",
            "title": "Relaxed Tailored Capsule",
            "subtitle": "Cashmere crewneck in oat + charcoal trousers",
            "synergy_score": 96,
            "image_url": "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
            "garments": MOCK_ITEMS[:3]
        },
        "agenda": {
            "title": "Client Presentation at 2:00 PM",
            "context": "Layering recommended for air-conditioned studio."
        },
        "streak_days": 12
    }

@app.post(f"{settings.API_V1_STR}/planner/wear-today")
async def mark_wearing_today(current_user: CurrentUser = Depends(get_current_user)):
    return {
        "status": "success",
        "message": "Outfit marked as worn today!",
        "new_streak": 13,
        "garments_updated": len(MOCK_ITEMS[:3])
    }

@app.get(f"{settings.API_V1_STR}/wishlist", response_model=List[WishlistItem])
async def list_wishlist(current_user: CurrentUser = Depends(get_current_user)):
    now = datetime.now(timezone.utc)
    return [
        WishlistItem(
            id="wish-1",
            title="Tailored Trench",
            brand="Sandro Studio",
            price=380.0,
            product_url="https://example.com/trench",
            image_url="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80",
            pairs_count=5,
            cooldown_hours=24,
            cooldown_expires_at=now + timedelta(hours=14),
            can_purchase=False
        ),
        WishlistItem(
            id="wish-2",
            title="Silk Crepe Slip",
            brand="Cocoa Hue",
            price=195.0,
            product_url="https://example.com/slip",
            image_url="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
            pairs_count=3,
            cooldown_hours=24,
            cooldown_expires_at=now + timedelta(hours=6),
            can_purchase=False
        ),
        WishlistItem(
            id="wish-3",
            title="Leather Loafers",
            brand="Totême",
            price=260.0,
            product_url="https://example.com/loafers",
            image_url="https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=400&q=80",
            pairs_count=7,
            cooldown_hours=24,
            cooldown_expires_at=now - timedelta(hours=2),
            can_purchase=True
        )
    ]

@app.post(f"{settings.API_V1_STR}/pre-purchase/audit", response_model=PrePurchaseAuditResult)
async def audit_product(url: str = Form(...), current_user: CurrentUser = Depends(get_current_user)):
    return await PrePurchaseService.evaluate_product_url(url, current_user.id)

@app.post(f"{settings.API_V1_STR}/tryon/render", response_model=TryOnResult)
async def render_tryon(garment_ids: List[str], current_user: CurrentUser = Depends(get_current_user)):
    return await TryOnEngineInterface.render_drape(current_user.id, garment_ids)

@app.get(f"{settings.API_V1_STR}/subscriptions/status")
async def get_subscription_status(current_user: CurrentUser = Depends(get_current_user)):
    now = datetime.now(timezone.utc)
    return {
        "tier": "pro_annual",
        "status": "trialing",
        "trial_days_remaining": 27,
        "renew_date": (now + timedelta(days=27)).strftime("%b %d, %Y"),
        "reminder_date": (now + timedelta(days=24)).strftime("%b %d, %Y"),
        "free_trial": "1-Month Complimentary"
    }

@app.get(f"{settings.API_V1_STR}/export/csv")
async def export_csv(current_user: CurrentUser = Depends(get_current_user)):
    csv_str = ExportService.generate_closet_csv(MOCK_ITEMS)
    return Response(
        content=csv_str,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=myoutfit_closet.csv"}
    )

@app.get(f"{settings.API_V1_STR}/export/pdf")
async def export_pdf(current_user: CurrentUser = Depends(get_current_user)):
    pdf_bytes = ExportService.generate_lookbook_pdf("Elena Rostova", MOCK_ITEMS)
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=myoutfit_lookbook.pdf"}
    )
