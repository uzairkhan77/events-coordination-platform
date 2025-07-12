// src/routes/routes.tsx
import { HomeLayout } from "@/layouts/home-layout/home-layout";
import SignInPage from "@/pages/auth/sign-in/sign-in.page";
import SignUpPage from "@/pages/auth/sign-up/sign-up.page";
import { EventsPage } from "@/pages/main/events/events.page";
import { MyEventsPage } from "@/pages/main/my-events/my-events.page";
import type { RouteObject } from "react-router-dom";

export const appRoutes: RouteObject[] = [
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    element: <HomeLayout />,
    children: [
      { path: "/events", element: <EventsPage /> },
      { path: "/my-events", element: <MyEventsPage /> },
      //   { path: "/profile/edit", element: <EditProfilePage /> },
    ],
  },
];
