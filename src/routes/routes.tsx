// src/routes/routes.tsx
import type { RouteObject } from "react-router-dom";
// import OverviewPage from "@/pages/OverviewPage";
// import NotFoundPage from "@/pages/NotFoundPage";
// import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "@/pages/auth/sign-in/sign-in-page";

export const appRoutes: RouteObject[] = [
  {
    path: "/sign-in",
    element: <LoginPage />,
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
