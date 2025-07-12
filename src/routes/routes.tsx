// src/routes/routes.tsx
import { HomeLayout } from "@/layouts/home-layout/home-layout";
import SignInPage from "@/pages/auth/sign-in/sign-in.page";
import SignUpPage from "@/pages/auth/sign-up/sign-up.page";
import type { RouteObject } from "react-router-dom";
// import OverviewPage from "@/pages/OverviewPage";
// import NotFoundPage from "@/pages/NotFoundPage";
// import ProtectedRoute from "./ProtectedRoute";

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
      //   { path: "/events", element: <EventsPage /> },
      //   { path: "/my-events", element: <MyEventsPage /> },
      //   { path: "/profile/edit", element: <EditProfilePage /> },
    ],
  },

  //   {
  //     element: <ProtectedRoute />, // like layout or guard
  //     children: [
  //       {
  //         path: "/overview",
  //         element: <OverviewPage />,
  //       },
  //       // more protected routes
  //     ],
  //   },
  //   {
  //     path: "*",
  //     element: <NotFoundPage />,
  //   },
];
