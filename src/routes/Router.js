import React from "react";
import { Navigate } from "react-router-dom";

// Layouts
import FullLayout from "../layouts/FullLayout/FullLayout.js";
import DrawerLayout from "../layouts/DrawerLayout/DrawerLayout.js";
import AuthLayout from "../layouts/AuthLayout/AuthLayout.js";
import ConversationLayout from "../layouts/ConversationLayout/ConversationLayout.js";

// Auth Protection
import ProtectedRoute from "../components/ProtectedRoute.js";

// Pages
import Dashboard1 from "../views/dashboards/Dashboard1.js";
import Dashboard2 from "../views/dashboards/Dashboard2.js";
import ConvoDashboard from "../views/dashboards/ConvoDashboard.js";
import Tenants from "../views/dashboards/Tenants.js";
import Billing from "../views/dashboards/Billing.js";
import SingleConversation from "../views/Settings/SingleConversation.js";
import LoginSelector from "../views/auth/LoginSelector.js";
import ModernLogin from "../views/auth/ModernLogin.js";
import Signup from "../views/auth/Signup.js";
import ForgotPassword from "../views/auth/ForgotPassword.js";
import InvotraAdmin from "../views/admin/InvotraAdmin";
import AdminDashboard from "../views/dashboards/AdminDashboard.js";
import IDSLogin from "../views/invauth/IDSLogin.js";

const ThemeRoutes = [
  // Direct route for IDSLogin without AuthLayout
  { path: "/ids-login", element: <IDSLogin /> },
  // Redirect from root and empty paths to IDS login
  { path: "/", element: <Navigate to="/ids-login" replace /> },
  { path: "", element: <Navigate to="/ids-login" replace /> },
  // Redirect from login to IDS login (to handle direct #/login access)
  { path: "/login", element: <Navigate to="/ids-login" replace /> },
  // Redirect from signup to auth/signup
  { path: "/signup", element: <Navigate to="/auth/signup" replace /> },
  // Redirect from forgot-password to auth/forgot-password
  { path: "/forgot-password", element: <Navigate to="/auth/forgot-password" replace /> },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginSelector /> },
      { path: "modern-login", element: <ModernLogin /> },
      { path: "signup", element: <Signup /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "", element: <Navigate to="/ids-login" /> },
    ],
  },
  {
    path: "/app",
    element: <ProtectedRoute><FullLayout /></ProtectedRoute>,
    children: [
      { path: "", element: <Navigate to="/app/dashboards/dashboard1" /> },
      { path: "dashboards/dashboard1", element: <Dashboard1 /> },
      { path: "dashboards/convo-dashboard", element: <ConvoDashboard /> },
      { path: "dashboards/tenants", element: <Tenants /> },
      { path: "admin", element: <InvotraAdmin /> },
      { path: "admin/dashboard", element: <AdminDashboard /> },
    ],
  },
  {
    path: "/app/dashboards",
    element: <ProtectedRoute><DrawerLayout /></ProtectedRoute>,
    children: [
      { path: "dashboard2", element: <Dashboard2 /> },
      { path: "billing", element: <Billing /> },
    ],
  },
  {
    path: "/app/settings/conversations",
    element: <ProtectedRoute><ConversationLayout /></ProtectedRoute>,
    children: [
      { path: ":id", element: <SingleConversation /> },
    ],
  }
];

export default ThemeRoutes;
