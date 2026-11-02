# 47 Screen Routing & Component Map

| # | Stitch Screen Export | Application Route | Component File |
|---|---|---|---|
| 1 | localization | `/profile/localization` | `src/features/profile/ProfileSettings.tsx` |
| 2 | notifications | `/profile/notifications` | `src/features/profile/ProfileSettings.tsx` |
| 3 | privacy_data_vault | `/profile/privacy` | `src/features/profile/ProfileSettings.tsx` |
| 4 | account_details | `/profile/account` | `src/features/profile/ProfileSettings.tsx` |
| 5 | app_preferences | `/profile/preferences` | `src/features/profile/ProfileSettings.tsx` |
| 6 | closet | `/closet` | `src/features/closet/ClosetGrid.tsx` |
| 7 | closet_search_filter_discovery | Bottom Sheet on `/closet` | `src/features/closet/ClosetGrid.tsx` |
| 8 | e_receipts_sync | `/closet/e-receipts` | `src/features/closet/ClosetGrid.tsx` |
| 9 | fit_tailoring_notes | `/planner/fit-notes` | `src/features/planner/PlannerScreen.tsx` |
| 10 | garment_item_detail | `/closet/item/:id` | `src/features/closet/ClosetGrid.tsx` |
| 11 | manual_add_garment | `/closet/add-manual` | `src/features/closet/ClosetGrid.tsx` |
| 12 | measurements_fit_notes | `/profile/measurements` | `src/features/profile/ProfileSettings.tsx` |
| 13 | outfit_builder | `/planner/builder` | `src/features/planner/PlannerScreen.tsx` |
| 14 | outfit_detail | `/outfit/:id` | `src/features/home/HomeScreen.tsx` |
| 15 | photo_snap_camera_ingestion | `/closet/snap` | `src/features/closet/ClosetGrid.tsx` |
| 16 | saved_outfits | `/outfits/saved` | `src/features/home/HomeScreen.tsx` |
| 17 | saved_plans | `/planner/saved` | `src/features/planner/PlannerScreen.tsx` |
| 18 | sign_up | `/auth/sign-up` | `src/features/profile/ProfileSettings.tsx` |
| 19 | wishlist | `/wishlist` | `src/features/wishlist/WishlistScreen.tsx` |
| 20 | avatar_onboarding | `/auth/avatar-onboarding` | `src/features/tryon/TryOnScreen.tsx` |
| 21 | connected_calendars | `/settings/calendars` | `src/features/profile/ProfileSettings.tsx` |
| 22 | home | `/` | `src/features/home/HomeScreen.tsx` |
| 23 | outfit_try_on | `/try-on` | `src/features/tryon/TryOnScreen.tsx` |
| 24 | pre_purchase_check | `/wishlist/check` | `src/features/wishlist/WishlistScreen.tsx` |
| 25 | pro_membership_checkout_2 | `/checkout` | `src/features/home/HomeScreen.tsx` |
| 26 | profile_settings | `/profile` | `src/features/profile/ProfileSettings.tsx` |
| 27 | sign_in_2 | `/auth/sign-in` | `src/features/profile/ProfileSettings.tsx` |
| 28 | travel_packing_assistant_2 | `/planner/travel-packing`| `src/features/planner/PlannerScreen.tsx` |
| 29 | wardrobe_insights_3 | `/insights` | `src/features/home/HomeScreen.tsx` |
| 30 | planner | `/planner` | `src/features/planner/PlannerScreen.tsx` |
| 31 | create_look | `/planner/create-look` | `src/features/planner/PlannerScreen.tsx` |
| 32 | new_plan | `/planner/new` | `src/features/planner/PlannerScreen.tsx` |
| 33 | notifications_center | `/notifications` | `src/features/home/HomeScreen.tsx` |
| 34 | plan_detail | `/planner/plan/:id` | `src/features/planner/PlannerScreen.tsx` |
| 35 | trial_success | `/auth/trial-success` | `src/features/home/HomeScreen.tsx` |
| 36 | wear_history | `/planner/wear-history` | `src/features/planner/PlannerScreen.tsx` |
| 37 | add_edit_fit_note | `/planner/fit-note/:id` | `src/features/planner/PlannerScreen.tsx` |
| 38 | confirmation_dialogs | Confirmation Modals | `src/components/ui/Card.tsx` |
| 39 | edit_garment | `/closet/item/:id/edit` | `src/features/closet/ClosetGrid.tsx` |
| 40 | encryption_whitepaper_reader | `/profile/whitepaper` | `src/features/profile/ProfileSettings.tsx` |
| 41 | export_options_sheet | Modal on `/profile` | `src/features/profile/ProfileSettings.tsx` |
| 42 | swap_pieces_sheet | Modal on `/planner` | `src/features/planner/PlannerScreen.tsx` |
| 43 | 3d_silhouette_scanning_guide | `/try-on/scan-guide` | `src/features/tryon/TryOnScreen.tsx` |
| 44 | atelier_concierge_legal_support | `/profile/support` | `src/features/profile/ProfileSettings.tsx` |
| 45 | dark_mode_home_dashboard | `/` (Theme: dark) | `src/features/home/HomeScreen.tsx` |
| 46 | dark_mode_virtual_try_on_studio | `/try-on` (Theme: dark)| `src/features/tryon/TryOnScreen.tsx` |
| 47 | system_edge_states_diagnostics | `/diagnostics` | `src/features/profile/ProfileSettings.tsx` |
