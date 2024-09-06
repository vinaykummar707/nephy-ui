import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/home/HomePage.tsx";
import DashboardPage from "./pages/home/DashboardPage.tsx";
import ActivityPage from "./pages/home/ActivityPage.tsx";
import SettingsPage from "./pages/home/SettingsPage.tsx";
import LoginPage from "./pages/authentication/LoginPage.tsx";
import RegisterPage from "./pages/authentication/RegisterPage.tsx";
import PageNotFoundPage from "./pages/error/PageNotFoundPage.tsx";
import OnboardingPage from "./pages/onboarding/OnboardingPage.tsx";
import RegisterHospitalPage from "./pages/authentication/RegisterHospitalPage.tsx";
import AuthLayoutPage from "./pages/authentication/AuthLayoutPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HospitalOnboardingPage from "@/pages/onboarding/HospitalOnboardingPage.tsx";
import DialysisUnitOnboardingPage from "@/pages/onboarding/DialysisUnitOnboardingPage.tsx";
import DialysisAdminOnboardingPage from "@/pages/onboarding/DialysisAdminOnboardingPage.tsx";
import AuthProtectedRoutePage from "./pages/authentication/AuthProtectedRoutePage.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import LoggedInRedirectPage from "./pages/authentication/LoggedInRedirectPage.tsx";
import MachinesPage from "./pages/home/MachinesPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/home"} />,
  },
  {
    path: "onboarding",
    element: (
      <AuthProtectedRoutePage>
        <OnboardingPage />
      </AuthProtectedRoutePage>
    ),
  },
  {
    path: "auth",
    element: <AuthLayoutPage />,
    children: [
      {
        path: "login",
        element: (
          <LoggedInRedirectPage>
            <LoginPage />
          </LoggedInRedirectPage>
        ),
      },
      {
        path: "register",
        element: (
          <LoggedInRedirectPage>
            <RegisterPage />
          </LoggedInRedirectPage>
        ),
      },
      {
        path: "register-hospital",
        element: <RegisterHospitalPage />,
      },
    ],
  },
  {
    path: "home",
    element: (
      <AuthProtectedRoutePage>
        <HomePage />
      </AuthProtectedRoutePage>
    ),
    children: [
      {
        path: "",
        element: <Navigate to={"dashboard"} />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "activity",
        element: <ActivityPage />,
      },
      {
        path: "machines",
        element: <MachinesPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "*",
        element: <PageNotFoundPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster closeButton={true} />
    </QueryClientProvider>
  </StrictMode>
);
