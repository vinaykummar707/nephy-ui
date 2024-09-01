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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "onboarding",
    element: <OnboardingPage />,
  },
  {
    path: "auth",
    element: <AuthLayoutPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "register-hospital",
        element: <RegisterHospitalPage />,
      },
    ],
  },
  {
    path: "home",
    element: <HomePage />,
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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
