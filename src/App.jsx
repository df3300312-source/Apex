import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Plans from "./pages/Plans";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RiskDisclosure from "./pages/RiskDisclosure";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import VerifyEmail from "./pages/VerifyEmail";

// Dashboard pages (inside dashboard folder)
import Dashboard from "./dashboard/Dashboard";
import Deposit from "./dashboard/Deposit";
import Withdraw from "./dashboard/Withdraw";
import Transactions from "./dashboard/Transactions";
import Referrals from "./dashboard/Referrals";
import Settings from "./dashboard/Settings";

// Admin imports
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ManageUsers from "./admin/ManageUsers";
import ManageDeposits from "./admin/ManageDeposits";
import ManageWithdrawals from "./admin/ManageWithdrawals";
import ManagePlans from "./admin/ManagePlans";
import AdminSettings from "./admin/AdminSettings";
import ManageMessages from "./admin/ManageMessages";
import ManageChats from "./admin/ManageChats";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes – wrapped in MainLayout (Navbar + Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/risk" element={<RiskDisclosure />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>

        {/* Protected routes – wrapped in PrivateRoute + DashboardLayout */}
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Admin routes – wrapped in AdminRoute + AdminLayout */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/messages" element={<ManageMessages />} />
            <Route path="/admin/deposits" element={<ManageDeposits />} />
            <Route path="/admin/withdrawals" element={<ManageWithdrawals />} />
            <Route path="/admin/chats" element={<ManageChats />} />
            <Route path="/admin/plans" element={<ManagePlans />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
