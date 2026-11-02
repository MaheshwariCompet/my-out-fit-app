# System Architecture & Privacy Data Flow

## Data Flow & Privacy Guarantees
- **Client-Side Tokenization:** Photos uploaded for garment cataloging undergo background matting via ephemeral memory buffers.
- **Storage Isolation:** Garment images are scoped under `storage.objects` where folder path matches user UUID.
- **Biometric Security:** Biometric parameters and 3D silhouette mesh vertices are decoupled from marketing analytics.

```
[Mobile Client (React 18 + Vite)]
        |
        v  (HTTPS / JWT Bearer)
[FastAPI Gateway (Port 8000)]
   ├── Rate Limiter (Sliding Window)
   ├── Auth Service (Supabase JWT Verification)
   ├── REST Controllers (/api/v1/closet, /planner, /wishlist, /tryon)
   └── Service Interfaces (PrePurchase, TryOnEngine, EReceiptParser)
        |
        v  (Row Level Security / Service Role)
[Supabase Cloud / Postgres 15]
   ├── Public Schema (Profiles, Items, Outfits, Plans, Wishlist)
   └── Storage Buckets (garments, avatars)
```
