# MyOutFit — Mobile-First AI Wardrobe & Outfit Planning Application

MyOutFit is a production-engineered digital wardrobe platform calibrated for intentional dressing, capsule efficiency, outfit planning, and mindful consumption.

---

## 1. Quick Start & Prerequisites

### Prerequisites
- Docker Engine & Docker Compose
- Python 3.11+
- Node.js 20+ & npm

### Local Run with Docker Compose
```bash
# Clone the repository and boot the full stack
docker compose up -d

# Backend is accessible at: http://localhost:8000/api/v1/docs
# Frontend is accessible at: http://localhost:5173
```

### Local Manual Run
```bash
# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Frontend
cd frontend
npm install
npm run dev
```

---

## 2. Supabase Setup & RLS

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Execute `supabase/migrations/20261102000000_init_schema.sql` inside the Supabase SQL Editor.
3. Seed the sample wardrobe by executing `supabase/seed.sql`.
4. Create the `garments` (public) and `avatars` (private) storage buckets.
5. Populate `backend/.env` with your project URL, anon key, and JWT Secret.

---

## 3. What is Mocked vs. Real

| Feature | State | Implementation Notes |
|---|---|---|
| Postgres & RLS Policies | **Real** | SQL migration enforces strict user isolation (`auth.uid() = user_id`) across all 16 tables. |
| JWT Authentication & Guest Fallback | **Real** | Verified via `python-jose` against Supabase JWT Secret, supporting guest tokens. |
| Closet Items & Outfits CRUD | **Real** | Complete REST endpoints with search, category filtering, wear counters, and status changes. |
| Wishlist 24h Cooldown Engine | **Real** | Cooldown timer calculation prevents impulse checkouts until timestamp expiration. |
| CSV & PDF Lookbook Generation | **Real** | Downloadable CSV formatters and ReportLab PDF document generators. |
| Pre-Purchase URL Auditor | **Mock (Beta)** | Interface hook (`PrePurchaseService`) returning CPW projection and pairing analyses. |
| 3D Avatar & Try-On | **Mock (Beta)** | Interface hook (`TryOnEngineInterface`) returning ease allowance, drape break, and tension scores. |
| App Store In-App Purchases | **Mock (Sandbox)**| Simulates StoreKit & Play Billing receipt validation with 30-day trial calculation. |
| E-Receipt Ingestion Webhook | **Mock (Sandbox)**| Tokenized forwarded email parser extracting garment fabrics, brands, and prices. |
| Calendar Synchronization | **Mock (Sandbox)**| Sync bridge matching weather forecasts and formal meeting agendas. |

---

## 4. Running Tests
```bash
cd backend
pytest -v tests/
```
