import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import SplashScreen from './screens/SplashScreen';
import Onboarding1 from './screens/Onboarding1';
import Onboarding2 from './screens/Onboarding2';
import Onboarding3 from './screens/Onboarding3';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import OTPVerification from './screens/OTPVerification';
import CreateProfile from './screens/CreateProfile';
import SelectPreferences from './screens/SelectPreferences';
import HomeDashboard from './screens/HomeDashboard';
import AIChatAssistant from './screens/AIChatAssistant';
import AIPromptSuggestions from './screens/AIPromptSuggestions';
import CreateNewTrip from './screens/CreateNewTrip';
import DestinationSearch from './screens/DestinationSearch';
import DestinationDetails from './screens/DestinationDetails';
import PopularDestinations from './screens/PopularDestinations';
import AIItineraryGenerator from './screens/AIItineraryGenerator';
import GeneratedItineraryOverview from './screens/GeneratedItineraryOverview';
import DayWiseTripPlan from './screens/DayWiseTripPlan';
import InteractiveMapView from './screens/InteractiveMapView';
import HotelRecommendations from './screens/HotelRecommendations';
import HotelDetails from './screens/HotelDetails';
import FlightSearch from './screens/FlightSearch';
import FlightDetails from './screens/FlightDetails';
import BudgetPlanner from './screens/BudgetPlanner';
import ExpenseTracker from './screens/ExpenseTracker';
import CurrencyConverter from './screens/CurrencyConverter';
import WeatherForecast from './screens/WeatherForecast';
import LocalEventsDiscovery from './screens/LocalEventsDiscovery';
import RestaurantRecommendations from './screens/RestaurantRecommendations';
import ActivityBooking from './screens/ActivityBooking';
import SmartPackingChecklist from './screens/SmartPackingChecklist';
import LanguageTranslator from './screens/LanguageTranslator';
import EmergencyContacts from './screens/EmergencyContacts';
import TravelInsurance from './screens/TravelInsurance';
import GroupTripCollaboration from './screens/GroupTripCollaboration';
import ChatWithTravelGroup from './screens/ChatWithTravelGroup';
import AITravelInsights from './screens/AITravelInsights';
import SavedTrips from './screens/SavedTrips';
import WishlistScreen from './screens/WishlistScreen';
import NotificationsCenter from './screens/NotificationsCenter';
import UserProfile from './screens/UserProfile';
import SettingsScreen from './screens/SettingsScreen';
import SubscriptionPlans from './screens/SubscriptionPlans';
import PaymentGateway from './screens/PaymentGateway';
import BookingConfirmation from './screens/BookingConfirmation';
import ReviewsAndRatings from './screens/ReviewsAndRatings';
import HelpAndSupport from './screens/HelpAndSupport';
import SuccessCelebration from './screens/SuccessCelebration';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="trip-planner-theme">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/onboarding-1" element={<Onboarding1 />} />
            <Route path="/onboarding-2" element={<Onboarding2 />} />
            <Route path="/onboarding-3" element={<Onboarding3 />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp" element={<OTPVerification />} />
            <Route path="/create-profile" element={<ProtectedRoute><CreateProfile /></ProtectedRoute>} />
            <Route path="/preferences" element={<ProtectedRoute><SelectPreferences /></ProtectedRoute>} />
            <Route path="/home" element={<ProtectedRoute><HomeDashboard /></ProtectedRoute>} />
            <Route path="/ai-chat" element={<ProtectedRoute><AIChatAssistant /></ProtectedRoute>} />
            <Route path="/ai-prompts" element={<ProtectedRoute><AIPromptSuggestions /></ProtectedRoute>} />
            <Route path="/create-trip" element={<ProtectedRoute><CreateNewTrip /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><DestinationSearch /></ProtectedRoute>} />
            <Route path="/destination/:id" element={<ProtectedRoute><DestinationDetails /></ProtectedRoute>} />
            <Route path="/popular" element={<ProtectedRoute><PopularDestinations /></ProtectedRoute>} />
            <Route path="/generate-itinerary" element={<ProtectedRoute><AIItineraryGenerator /></ProtectedRoute>} />
            <Route path="/itinerary/:id" element={<ProtectedRoute><GeneratedItineraryOverview /></ProtectedRoute>} />
            <Route path="/itinerary/:id/day/:day" element={<ProtectedRoute><DayWiseTripPlan /></ProtectedRoute>} />
            <Route path="/map" element={<ProtectedRoute><InteractiveMapView /></ProtectedRoute>} />
            <Route path="/hotels" element={<ProtectedRoute><HotelRecommendations /></ProtectedRoute>} />
            <Route path="/hotel/:id" element={<ProtectedRoute><HotelDetails /></ProtectedRoute>} />
            <Route path="/flights" element={<ProtectedRoute><FlightSearch /></ProtectedRoute>} />
            <Route path="/flight/:id" element={<ProtectedRoute><FlightDetails /></ProtectedRoute>} />
            <Route path="/budget" element={<ProtectedRoute><BudgetPlanner /></ProtectedRoute>} />
            <Route path="/expenses" element={<ProtectedRoute><ExpenseTracker /></ProtectedRoute>} />
            <Route path="/currency" element={<ProtectedRoute><CurrencyConverter /></ProtectedRoute>} />
            <Route path="/weather" element={<ProtectedRoute><WeatherForecast /></ProtectedRoute>} />
            <Route path="/events" element={<ProtectedRoute><LocalEventsDiscovery /></ProtectedRoute>} />
            <Route path="/restaurants" element={<ProtectedRoute><RestaurantRecommendations /></ProtectedRoute>} />
            <Route path="/activities" element={<ProtectedRoute><ActivityBooking /></ProtectedRoute>} />
            <Route path="/packing" element={<ProtectedRoute><SmartPackingChecklist /></ProtectedRoute>} />
            <Route path="/translate" element={<ProtectedRoute><LanguageTranslator /></ProtectedRoute>} />
            <Route path="/emergency" element={<ProtectedRoute><EmergencyContacts /></ProtectedRoute>} />
            <Route path="/insurance" element={<ProtectedRoute><TravelInsurance /></ProtectedRoute>} />
            <Route path="/group/:id" element={<ProtectedRoute><GroupTripCollaboration /></ProtectedRoute>} />
            <Route path="/group/:id/chat" element={<ProtectedRoute><ChatWithTravelGroup /></ProtectedRoute>} />
            <Route path="/insights" element={<ProtectedRoute><AITravelInsights /></ProtectedRoute>} />
            <Route path="/saved-trips" element={<ProtectedRoute><SavedTrips /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><WishlistScreen /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><NotificationsCenter /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsScreen /></ProtectedRoute>} />
            <Route path="/subscription" element={<ProtectedRoute><SubscriptionPlans /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><PaymentGateway /></ProtectedRoute>} />
            <Route path="/confirmation" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
            <Route path="/reviews" element={<ProtectedRoute><ReviewsAndRatings /></ProtectedRoute>} />
            <Route path="/support" element={<ProtectedRoute><HelpAndSupport /></ProtectedRoute>} />
            <Route path="/success" element={<ProtectedRoute><SuccessCelebration /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
