-- Updated Seed Data for Elena Rostova with auth.users registration
do $$
declare
    demo_user_id uuid := '00000000-0000-0000-0000-000000000001';
    item1_id uuid := '11111111-1111-1111-1111-111111111101';
    item2_id uuid := '11111111-1111-1111-1111-111111111102';
    item3_id uuid := '11111111-1111-1111-1111-111111111103';
    item4_id uuid := '11111111-1111-1111-1111-111111111104';
    item5_id uuid := '11111111-1111-1111-1111-111111111105';
    item6_id uuid := '11111111-1111-1111-1111-111111111106';
    outfit1_id uuid := '22222222-2222-2222-2222-222222222201';
    outfit2_id uuid := '22222222-2222-2222-2222-222222222202';
    plan1_id uuid := '33333333-3333-3333-3333-333333333301';
begin
    -- 0. Insert mock user into auth.users to satisfy the foreign key constraint
    insert into auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        role,
        aud
    )
    values (
        demo_user_id,
        '00000000-0000-0000-0000-000000000000',
        'elena.rostova@myoutfit.app',
        crypt('ElenaPass123!', gen_salt('bf')),
        now(),
        now(),
        now(),
        '{"provider":"email","providers":["email"]}',
        '{"full_name":"Elena Rostova"}',
        false,
        'authenticated',
        'authenticated'
    )
    on conflict (id) do nothing;

    -- 1. Insert Profile
    insert into public.profiles (id, email, full_name, primary_focus, show_body_shape_labels)
    values (demo_user_id, 'elena.rostova@myoutfit.app', 'Elena Rostova', 'Smart Everyday', false)
    on conflict (id) do nothing;

    -- 2. Insert Settings
    insert into public.user_settings (user_id, language, dimension_unit, temperature_unit, currency, sizing_standard, theme, dispatch_hour)
    values (demo_user_id, 'en-US', 'metric', 'celsius', 'USD', 'EU', 'light', '07:30')
    on conflict (user_id) do nothing;

    -- 3. Insert Biometrics
    insert into public.user_biometrics (user_id, height_cm, bust_cm, waist_cm, high_hip_cm, inseam_cm, shoulder_width_cm)
    values (demo_user_id, 174.0, 86.0, 68.0, 94.0, 79.0, 40.0)
    on conflict (user_id) do nothing;

    -- 4. Insert Closet Items
    insert into public.closet_items (id, user_id, title, brand, category, status, color_name, color_hex, purchase_price, wear_count, fabric_composition, care_instructions)
    values 
    (item1_id, demo_user_id, 'Tailored Camel Wool Coat', 'Totême', 'outerwear', 'ready', 'Camel Tan', '#C48A58', 580.00, 38, '100% Italian Virgin Wool', 'Specialist Dry Clean Only • Rest 48h'),
    (item2_id, demo_user_id, 'Pleated Virgin Wool Trousers', 'Studio Nicholson', 'bottoms', 'ready', 'Charcoal Melange', '#36383E', 360.00, 38, 'Italian Virgin Wool', 'Dry Clean Only'),
    (item3_id, demo_user_id, 'Cashmere Crewneck', 'Arket', 'knitwear', 'ready', 'Oatmeal', '#DED3C4', 150.00, 54, '100% Mongolian Cashmere', 'Hand wash cold or gentle wool cycle'),
    (item4_id, demo_user_id, 'Relaxed Linen Overshirt', 'COS', 'tops', 'in_laundry', 'Ecru Linen', '#E3DDD5', 95.00, 24, 'Pure French Linen', 'Machine wash gentle 30°C'),
    (item5_id, demo_user_id, 'Japanese Selvedge Denim', 'Kuroki Mill', 'bottoms', 'ready', 'Indigo Raw', '#1F2937', 185.00, 42, '13.5oz Kuroki Mill Denim', 'Cold soak inside out'),
    (item6_id, demo_user_id, 'Suede Penny Loafers', 'Totême', 'footwear', 'ready', 'Tobacco Brown', '#7C482B', 220.00, 42, 'Calfskin Suede & Leather Sole', 'Suede brush & protectant spray')
    on conflict (id) do nothing;

    -- 5. Insert Outfits & Mappings
    insert into public.outfits (id, user_id, title, occasion, notes, synergy_score, comfort_rating, is_saved)
    values
    (outfit1_id, demo_user_id, 'The Boardroom Sartorial', 'Business / Work', 'Tailored camel, oat cashmere and pleated trousers for rainy autumn day.', 96, 9.8, true),
    (outfit2_id, demo_user_id, 'Relaxed Tailored Capsule', 'Casual Friday', 'Oatmeal cashmere with Japanese selvedge denim.', 94, 9.5, true)
    on conflict (id) do nothing;

    insert into public.outfit_items (outfit_id, item_id, layer_order)
    values
    (outfit1_id, item1_id, 1),
    (outfit1_id, item3_id, 2),
    (outfit1_id, item2_id, 3),
    (outfit1_id, item6_id, 4)
    on conflict do nothing;

    -- 6. Insert Planner Plan & Plan Days
    insert into public.planner_plans (id, user_id, title, archetype, start_date, end_date, is_active)
    values (plan1_id, demo_user_id, 'Autumn Minimalist', 'Weekly Rotation', current_date, current_date + 7, true)
    on conflict (id) do nothing;

    insert into public.plan_days (plan_id, date, agenda_title, weather_summary, outfit_id)
    values 
    (plan1_id, current_date, 'Midweek Strategy Presentation', '14°C Crisp / Occasional Light Rain', outfit1_id),
    (plan1_id, current_date + 1, 'Creative Studio Review', '15°C Overcast', outfit2_id)
    on conflict do nothing;

    -- 7. Insert Wear History
    insert into public.wear_history (user_id, outfit_id, date, context_title, weather_summary, rating, streak_count)
    values 
    (demo_user_id, outfit1_id, current_date, 'Client Presentation', '14°C Crisp • Rain', 5, 12),
    (demo_user_id, outfit2_id, current_date - 1, 'Casual Studio Day', '16°C Clear Sky', 5, 11)
    on conflict do nothing;

    -- 8. Insert Fit Notes
    insert into public.fit_notes (user_id, item_id, alterations, waist_balance_calibration, drape_notes, tailor_studio, tailor_fee)
    values (demo_user_id, item2_id, array['Hemmed -2.5cm', 'Waist Taken In -1.5cm'], 0, 'High waist fit comfortable. Waistband has 2cm ease; hem breaks cleanly at ankle loafer.', 'Maison St. Germain Tailoring Studio', 38.00)
    on conflict do nothing;

    -- 9. Insert Wishlist Items
    insert into public.wishlist_items (user_id, title, brand, product_url, price, pairs_count, cooldown_hours, cooldown_expires_at)
    values
    (demo_user_id, 'Silk Crepe Slip', 'Cocoa Hue', 'https://example.com/slip', 195.00, 3, 24, now() + interval '6 hours'),
    (demo_user_id, 'Alpaca Knit', 'Sézane', 'https://example.com/alpaca', 210.00, 4, 24, now() + interval '21 hours'),
    (demo_user_id, 'Leather Loafers', 'Totême', 'https://example.com/loafers', 260.00, 7, 24, now() - interval '2 hours')
    on conflict do nothing;

    -- 10. Insert Subscriptions
    insert into public.subscriptions (user_id, plan_tier, status, store_platform, trial_start, trial_end)
    values (demo_user_id, 'pro_annual', 'trialing', 'apple_app_store', now() - interval '3 days', now() + interval '27 days')
    on conflict do nothing;

    -- 11. Insert Connected Calendars
    insert into public.connected_calendars (user_id, provider, account_email, calendars_synced, is_connected)
    values
    (demo_user_id, 'google', 'elena.rostova@gmail.com', 2, true),
    (demo_user_id, 'outlook', 'elena.rostova@corporate.com', 1, true),
    (demo_user_id, 'apple', 'elena.rostova@icloud.com', 0, false)
    on conflict do nothing;

    -- 12. Insert Notifications
    insert into public.notifications (user_id, title, body, category)
    values
    (demo_user_id, 'Morning Outfit Inspiration', '14°C Crisp and rain forecasted. We prepared The Boardroom Sartorial for your 2:00 PM presentation.', 'curation'),
    (demo_user_id, 'Resting Fiber Completed', 'Your Totême Camel Wool Coat has rested 48h and is fully refreshed for your rotation.', 'care'),
    (demo_user_id, '1-Month Atelier Pass Renewal', 'Your trial renews in 3 days. Enjoy unlimited personal styling or manage your membership anytime.', 'reminder')
    on conflict do nothing;
end $$;