import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
import { Home, Calendar, Shirt, Bookmark, User } from "lucide-react";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

// Auth
import SignIn from "./features/auth/SignIn";
import SignUp from "./features/auth/SignUp";
import ForgotPassword from "./features/auth/ForgotPassword";
import AvatarOnboarding from "./features/auth/AvatarOnboarding";
import TrialSuccess from "./features/auth/TrialSuccess";

// Home
import HomeScreen from "./features/home/HomeScreen";
import NotificationsCenter from "./features/home/NotificationsCenter";
import OutfitDetail from "./features/home/OutfitDetail";
import SavedOutfits from "./features/home/SavedOutfits";

// Closet
import ClosetGrid from "./features/closet/ClosetGrid";
import PhotoSnap from "./features/closet/PhotoSnap";
import EReceiptsSync from "./features/closet/EReceiptsSync";
import ManualAddGarment from "./features/closet/ManualAddGarment";
import GarmentDetail from "./features/closet/GarmentDetail";
import EditGarment from "./features/closet/EditGarment";

// Planner
import PlannerScreen from "./features/planner/PlannerScreen";
import NewPlan from "./features/planner/NewPlan";
import PlanDetail from "./features/planner/PlanDetail";
import SavedPlans from "./features/planner/SavedPlans";
import CreateLook from "./features/planner/CreateLook";
import WearHistory from "./features/planner/WearHistory";
import FitNotesList from "./features/planner/FitNotesList";
import AddEditFitNote from "./features/planner/AddEditFitNote";
import OutfitBuilder from "./features/planner/OutfitBuilder";
import TravelPacking from "./features/planner/TravelPacking";

// Wishlist & TryOn
import WishlistScreen from "./features/wishlist/WishlistScreen";
import PrePurchaseCheck from "./features/wishlist/PrePurchaseCheck";
import TryOnScreen from "./features/tryon/TryOnScreen";
import SilhouetteScanGuide from "./features/tryon/SilhouetteScanGuide";

// Insights & Profile
import WardrobeInsights from "./features/insights/WardrobeInsights";
import ProfileSettings from "./features/profile/ProfileSettings";
import AccountDetails from "./features/profile/AccountDetails";
import MeasurementsFit from "./features/profile/MeasurementsFit";
import AppPreferences from "./features/profile/AppPreferences";
import Localization from "./features/profile/Localization";
import NotificationPrefs from "./features/profile/NotificationPrefs";
import PrivacyDataVault from "./features/profile/PrivacyDataVault";
import WhitepaperReader from "./features/profile/WhitepaperReader";
import ConciergeSupport from "./features/profile/ConciergeSupport";
import ConnectedCalendars from "./features/profile/ConnectedCalendars";

// Commerce & Diagnostics
import CheckoutScreen from "./features/commerce/CheckoutScreen";
import SystemDiagnostics from "./features/shared/SystemDiagnostics";
import { WardrobeProvider } from "./context/WardrobeContext";

// In App():
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WardrobeProvider>
          <BrowserRouter>
            <MainLayout />
          </BrowserRouter>
        </WardrobeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function MainLayout() {
  const location = useLocation();

  // Hide all navigation (both desktop side rail and mobile bottom bar) on auth, checkout, and full-screen sub-flows
  const hideNavigation = [
    "/auth",
    "/checkout",
    "/snap",
    "/add-manual",
    "/e-receipts",
    "/item/",
    "/outfit/",
    "/plan/",
    "/fit-note/",
    "/whitepaper",
    "/scan-guide",
  ].some((path) => location.pathname.includes(path));

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#121418] text-[#1F2F4F] dark:text-[#FAF8F5] flex flex-col md:flex-row antialiased">
      {/* Side Rail for 768px+ (Hidden on Auth & Checkout Flows) */}
      {!hideNavigation && (
        <aside className="hidden md:flex flex-col w-64 border-r border-[#E8E2D9] dark:border-[#2A313D] p-6 space-y-6 shrink-0 bg-white dark:bg-[#161A22]">
          <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1F2F4F] dark:text-white">
            MyOutFit
          </h1>
          <nav className="flex flex-col space-y-2">
            <SideLink to="/" icon={<Home size={20} />} label="Home" />
            <SideLink
              to="/planner"
              icon={<Calendar size={20} />}
              label="Planner"
            />
            <SideLink to="/closet" icon={<Shirt size={20} />} label="Closet" />
            <SideLink
              to="/wishlist"
              icon={<Bookmark size={20} />}
              label="Wishlist"
            />
            <SideLink to="/profile" icon={<User size={20} />} label="Profile" />
          </nav>
        </aside>
      )}

      {/* Main Content Viewport */}
      <main
        className={`flex-1 overflow-y-auto w-full ${
          hideNavigation
            ? "p-4 md:p-12 flex items-center justify-center min-h-screen"
            : "pb-28 md:pb-8 p-4 md:p-8 max-w-7xl mx-auto"
        }`}
      >
        <Routes>
          {/* Auth */}
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/auth/avatar-onboarding"
            element={<AvatarOnboarding />}
          />
          <Route path="/auth/trial-success" element={<TrialSuccess />} />

          {/* Home */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/notifications" element={<NotificationsCenter />} />
          <Route path="/outfit/:id" element={<OutfitDetail />} />
          <Route path="/outfits/saved" element={<SavedOutfits />} />

          {/* Closet */}
          <Route path="/closet" element={<ClosetGrid />} />
          <Route path="/closet/snap" element={<PhotoSnap />} />
          <Route path="/closet/e-receipts" element={<EReceiptsSync />} />
          <Route path="/closet/add-manual" element={<ManualAddGarment />} />
          <Route path="/closet/item/:id" element={<GarmentDetail />} />
          <Route path="/closet/item/:id/edit" element={<EditGarment />} />

          {/* Planner */}
          <Route path="/planner" element={<PlannerScreen />} />
          <Route path="/planner/new" element={<NewPlan />} />
          <Route path="/planner/plan/:id" element={<PlanDetail />} />
          <Route path="/planner/saved" element={<SavedPlans />} />
          <Route path="/planner/create-look" element={<CreateLook />} />
          <Route path="/planner/wear-history" element={<WearHistory />} />
          <Route path="/planner/fit-notes" element={<FitNotesList />} />
          <Route path="/planner/fit-note/:id" element={<AddEditFitNote />} />
          <Route path="/planner/builder" element={<OutfitBuilder />} />
          <Route path="/planner/travel-packing" element={<TravelPacking />} />

          {/* Wishlist & Try-On */}
          <Route path="/wishlist" element={<WishlistScreen />} />
          <Route path="/wishlist/check" element={<PrePurchaseCheck />} />
          <Route path="/try-on" element={<TryOnScreen />} />
          <Route path="/try-on/scan-guide" element={<SilhouetteScanGuide />} />

          {/* Insights & Settings */}
          <Route path="/insights" element={<WardrobeInsights />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/profile/account" element={<AccountDetails />} />
          <Route path="/profile/measurements" element={<MeasurementsFit />} />
          <Route path="/profile/preferences" element={<AppPreferences />} />
          <Route path="/profile/localization" element={<Localization />} />
          <Route
            path="/profile/notifications"
            element={<NotificationPrefs />}
          />
          <Route path="/profile/privacy" element={<PrivacyDataVault />} />
          <Route path="/profile/whitepaper" element={<WhitepaperReader />} />
          <Route path="/profile/support" element={<ConciergeSupport />} />
          <Route path="/settings/calendars" element={<ConnectedCalendars />} />

          {/* Commerce & Diagnostics */}
          <Route path="/checkout" element={<CheckoutScreen />} />
          <Route path="/diagnostics" element={<SystemDiagnostics />} />

          {/* Fallback */}
          <Route path="*" element={<HomeScreen />} />
        </Routes>
      </main>

      {/* 5-Tab Mobile Bottom Navigation (Hidden on Auth & Checkout Flows) */}
      {!hideNavigation && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#FAF8F5]/90 dark:bg-[#121418]/90 backdrop-blur-md border-t border-[#E8E2D9] dark:border-[#2A313D] flex items-center justify-around z-50">
          <TabLink to="/" icon={<Home size={22} />} label="Home" />
          <TabLink
            to="/planner"
            icon={<Calendar size={22} />}
            label="Planner"
          />
          <TabLink to="/closet" icon={<Shirt size={22} />} label="Closet" />
          <TabLink
            to="/wishlist"
            icon={<Bookmark size={22} />}
            label="Wishlist"
          />
          <TabLink to="/profile" icon={<User size={22} />} label="Profile" />
        </nav>
      )}
    </div>
  );
}

function TabLink({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center min-w-[44px] min-h-[44px] text-xs transition-colors ${
          isActive
            ? "text-[#C4623A] font-semibold"
            : "text-neutral-500 dark:text-neutral-400"
        }`
      }
    >
      {icon}
      <span className="mt-1">{label}</span>
    </NavLink>
  );
}

function SideLink({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm transition-all min-h-[44px] ${
          isActive
            ? "bg-[#1F2F4F] text-white dark:bg-white dark:text-[#1F2F4F] font-semibold"
            : "hover:bg-black/5 dark:hover:bg-white/5 text-neutral-600 dark:text-neutral-300"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
