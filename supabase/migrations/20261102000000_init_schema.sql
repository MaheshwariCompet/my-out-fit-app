-- MyOutFit Production Schema with Row Level Security (RLS)
create extension if not exists "uuid-ossp";

create type garment_status as enum ('ready', 'in_laundry', 'dry_clean');
create type garment_category as enum ('outerwear', 'tops', 'bottoms', 'knitwear', 'footwear', 'accessories');
create type subscription_status as enum ('trialing', 'active', 'canceled', 'expired');
create type calendar_provider as enum ('google', 'outlook', 'apple');

-- 1. Profiles
create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text not null,
    full_name text default 'Elena Rostova',
    avatar_url text,
    is_guest boolean default false,
    primary_focus text default 'Smart Everyday',
    show_body_shape_labels boolean default false,
    enable_ease_allowance boolean default true,
    ease_allowance_cm numeric default 2.0,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 2. User Settings
create table if not exists public.user_settings (
    user_id uuid primary key references public.profiles(id) on delete cascade,
    language text default 'en-US',
    dimension_unit text default 'metric',
    temperature_unit text default 'celsius',
    currency text default 'USD',
    sizing_standard text default 'EU',
    theme text default 'light',
    default_starting_view text default 'home',
    haptic_feedback boolean default true,
    reduced_motion boolean default false,
    auto_play_spins boolean default true,
    high_contrast boolean default false,
    morning_outfit_inspiration boolean default true,
    dispatch_hour text default '07:30',
    evening_outfit_checkin boolean default true,
    laundry_reminders boolean default true,
    resting_fiber_alerts boolean default false,
    upcoming_voyage_alerts boolean default true,
    trial_reminder boolean default true,
    mindful_cooldown_enabled boolean default true,
    cooldown_hours integer default 24,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 3. Biometrics
create table if not exists public.user_biometrics (
    user_id uuid primary key references public.profiles(id) on delete cascade,
    height_cm numeric default 174.0,
    bust_cm numeric default 86.0,
    waist_cm numeric default 68.0,
    high_hip_cm numeric default 94.0,
    inseam_cm numeric default 79.0,
    shoulder_width_cm numeric default 40.0,
    harmonic_index numeric default 0.72,
    avatar_mesh_calibrated boolean default true,
    last_calibrated_at timestamptz default now(),
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 4. Closet Items
create table if not exists public.closet_items (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    title text not null,
    brand text,
    category garment_category not null default 'tops',
    status garment_status not null default 'ready',
    color_name text,
    color_hex text,
    seasonality text[] default array['Autumn', 'Winter'],
    fabric_composition text,
    care_instructions text,
    rest_period_hours integer default 0,
    purchase_price numeric default 0.0,
    purchase_date date default current_date,
    wear_count integer default 0,
    last_worn_at date,
    is_favorite boolean default false,
    is_archived boolean default false,
    image_url text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 5. Outfits
create table if not exists public.outfits (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    title text not null,
    occasion text,
    notes text,
    synergy_score integer default 95,
    comfort_rating numeric default 9.8,
    is_saved boolean default false,
    collection_tag text default 'All',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 6. Outfit Garments Mapping
create table if not exists public.outfit_items (
    outfit_id uuid not null references public.outfits(id) on delete cascade,
    item_id uuid not null references public.closet_items(id) on delete cascade,
    layer_order integer default 1,
    primary key (outfit_id, item_id)
);

-- 7. Planner Plans
create table if not exists public.planner_plans (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    title text not null,
    archetype text default 'Weekly Rotation',
    start_date date not null,
    end_date date not null,
    is_active boolean default false,
    destination text,
    notes text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 8. Plan Days
create table if not exists public.plan_days (
    id uuid primary key default gen_random_uuid(),
    plan_id uuid not null references public.planner_plans(id) on delete cascade,
    date date not null,
    agenda_title text,
    weather_summary text,
    outfit_id uuid references public.outfits(id) on delete set null,
    is_worn boolean default false,
    created_at timestamptz default now()
);

-- 9. Wear History
create table if not exists public.wear_history (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    outfit_id uuid references public.outfits(id) on delete set null,
    date date not null default current_date,
    context_title text,
    weather_summary text,
    rating integer default 5,
    streak_count integer default 1,
    created_at timestamptz default now()
);

-- 10. Fit Notes
create table if not exists public.fit_notes (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    item_id uuid not null references public.closet_items(id) on delete cascade,
    alterations text[] default array[]::text[],
    waist_balance_calibration integer default 0,
    drape_notes text,
    stretch_handfeel text,
    tailor_studio text,
    tailor_fee numeric default 0.0,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 11. Wishlist Items
create table if not exists public.wishlist_items (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    title text not null,
    brand text,
    product_url text,
    image_url text,
    price numeric not null,
    pairs_count integer default 0,
    cooldown_hours integer default 24,
    created_at timestamptz default now(),
    cooldown_expires_at timestamptz not null
);

-- 12. Travel Packing
create table if not exists public.travel_packing_lists (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    destination text not null,
    start_date date not null,
    end_date date not null,
    baggage_allowance_kg numeric default 10.0,
    travel_vibe text default 'Business & Leisure',
    created_at timestamptz default now()
);

create table if not exists public.travel_packing_items (
    id uuid primary key default gen_random_uuid(),
    packing_list_id uuid not null references public.travel_packing_lists(id) on delete cascade,
    item_id uuid not null references public.closet_items(id) on delete cascade,
    weight_kg numeric default 0.8,
    is_packed boolean default false
);

-- 13. Subscriptions
create table if not exists public.subscriptions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    plan_tier text not null default 'pro_annual',
    status subscription_status not null default 'trialing',
    store_platform text,
    store_transaction_id text,
    trial_start timestamptz default now(),
    trial_end timestamptz default (now() + interval '30 days'),
    current_period_end timestamptz default (now() + interval '30 days'),
    reminder_sent boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 14. Connected Calendars
create table if not exists public.connected_calendars (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    provider calendar_provider not null,
    account_email text not null,
    calendars_synced integer default 1,
    is_connected boolean default true,
    last_synced_at timestamptz default now()
);

-- 15. E-Receipts Ingestion
create table if not exists public.e_receipt_logs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    source_email text not null,
    retailer text not null,
    item_title text not null,
    amount numeric not null,
    extracted_metadata jsonb default '{}'::jsonb,
    status text default 'auto_cataloged',
    created_at timestamptz default now()
);

-- 16. In-App Notifications
create table if not exists public.notifications (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    title text not null,
    body text not null,
    category text default 'curation',
    action_url text,
    is_read boolean default false,
    created_at timestamptz default now()
);

-- Enable RLS Across All Tables
alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.user_biometrics enable row level security;
alter table public.closet_items enable row level security;
alter table public.outfits enable row level security;
alter table public.outfit_items enable row level security;
alter table public.planner_plans enable row level security;
alter table public.plan_days enable row level security;
alter table public.wear_history enable row level security;
alter table public.fit_notes enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.travel_packing_lists enable row level security;
alter table public.travel_packing_items enable row level security;
alter table public.subscriptions enable row level security;
alter table public.connected_calendars enable row level security;
alter table public.e_receipt_logs enable row level security;
alter table public.notifications enable row level security;

-- Policies ensuring zero multi-tenant data leakage
create policy "User owns profile" on public.profiles for all using (auth.uid() = id);
create policy "User owns settings" on public.user_settings for all using (auth.uid() = user_id);
create policy "User owns biometrics" on public.user_biometrics for all using (auth.uid() = user_id);
create policy "User owns closet" on public.closet_items for all using (auth.uid() = user_id);
create policy "User owns outfits" on public.outfits for all using (auth.uid() = user_id);
create policy "User owns outfit items" on public.outfit_items for all using (
    exists (select 1 from public.outfits o where o.id = outfit_items.outfit_id and o.user_id = auth.uid())
);
create policy "User owns plans" on public.planner_plans for all using (auth.uid() = user_id);
create policy "User owns plan days" on public.plan_days for all using (
    exists (select 1 from public.planner_plans p where p.id = plan_days.plan_id and p.user_id = auth.uid())
);
create policy "User owns wear history" on public.wear_history for all using (auth.uid() = user_id);
create policy "User owns fit notes" on public.fit_notes for all using (auth.uid() = user_id);
create policy "User owns wishlist" on public.wishlist_items for all using (auth.uid() = user_id);
create policy "User owns packing" on public.travel_packing_lists for all using (auth.uid() = user_id);
create policy "User owns packing items" on public.travel_packing_items for all using (
    exists (select 1 from public.travel_packing_lists l where l.id = travel_packing_items.packing_list_id and l.user_id = auth.uid())
);
create policy "User owns subscriptions" on public.subscriptions for all using (auth.uid() = user_id);
create policy "User owns calendars" on public.connected_calendars for all using (auth.uid() = user_id);
create policy "User owns e-receipts" on public.e_receipt_logs for all using (auth.uid() = user_id);
create policy "User owns notifications" on public.notifications for all using (auth.uid() = user_id);
