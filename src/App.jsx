import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout"; // 👈 import the new layout

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
import Register from "./pages/Register";

// Dashboard pages (inside dashboard folder)
import Dashboard from "./dashboard/Dashboard";
import Deposit from "./dashboard/Deposit";
import Withdraw from "./dashboard/Withdraw";
import Transactions from "./dashboard/Transactions";
import Referrals from "./dashboard/Referrals";
import Settings from "./dashboard/Settings";

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
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes – wrapped in PrivateRoute + DashboardLayout */}
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            {" "}
            {/* 👈 wrap all dashboard pages with sidebar */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
