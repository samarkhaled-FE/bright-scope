import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/fonts.css";
import "./index.css";
// i18n must be imported before any component that uses translations
import "./i18n";
import "flyonui/flyonui.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MasterLayout from "./layout/MasterLayout.jsx";
import Services from "./pages/Services/Services.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import ServiceDetails from "./pages/ServiceDetails/ServiceDetails.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import ConfirmPassword from "./pages/Auth/ConfirmPassword.jsx";
import PasswordUpdatedSuccess from "./pages/Auth/PasswordUpdatedSuccess.jsx";
import ErrorBoundary from "./utils/ErrorBoundary.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Payment from "./pages/Payment/PaymentSuccess.jsx";
import PaymentSuccess from "./pages/Payment/PaymentSuccess.jsx";
import PaymentFailed from "./pages/Payment/PaymentFailed.jsx";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
const router = createBrowserRouter([
  {
    element: <MasterLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },

      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      { path: "/services/:category?", element: <Services /> }, // ✅ from home to services category

      {
        path: "/service/:id",
        element: <ServiceDetails />, // ✅ from services page to service details page
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment-failed",
        element: <PaymentFailed />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/reset-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:uid/:token",
        element: <ResetPassword />,
      },

      {
        path: "/confirm-password",
        element: <ConfirmPassword />,
      },
      {
        path: "/password-updated-success",
        element: <PasswordUpdatedSuccess />,
      },
    ],
  },
  {
    path: "*",
    element: <h1 className="text-center mt-20">404 - Page Not Found</h1>,
  },
]);

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ErrorBoundary>
);
