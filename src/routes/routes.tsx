// src/routes/routes.tsx
import { HomeLayout } from "@/layouts/home-layout/home-layout";
import SignInPage from "@/pages/auth/sign-in/sign-in.page";
import SignUpPage from "@/pages/auth/sign-up/sign-up.page";
import EventDetailsPage from "@/pages/main/event-details/event-details.page";
import { EventsPage } from "@/pages/main/events/events.page";
import { MyEventsPage } from "@/pages/main/my-events/my-events.page";
import type { RouteObject } from "react-router-dom";
import AuthRedirect from "./AuthRedirect";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export const appRoutes: RouteObject[] = [
  {
    element: <PublicRoute />,
    children: [
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <HomeLayout />,
        children: [
          { path: "/events", element: <EventsPage /> },
          { path: "/my-events", element: <MyEventsPage /> },
          { path: "/events/:id", element: <EventDetailsPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <AuthRedirect />,
  },
];
