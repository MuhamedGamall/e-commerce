import { redirect } from "react-router-dom";
import { lazy } from "react";

import { MainLayout } from "../layouts";
const FAQs = lazy(() => import("../pages/FAQs"));
const TermsConditions = lazy(() => import("../pages/terms-conditions"));
const MainRoutes = [
  {
    path: "/",
    loader: ({ request }) => {
      const url = new URL(request.url);

      if (url.pathname === "/") {
        const locale = navigator.language.startsWith("ar") ? "ar" : "en";
        return redirect(`/${locale}`);
      }

      return null;
    },
    element: <div />,
  },
  // {
  //   path: "/:locale/login",
  //   element: <Login />,
  // },
  {
    path: "/:locale",
    element: <MainLayout />,
    children: [
      {
        path: "terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "FAQs",
        element: <FAQs />,
      },
    ],
  },
];

export default MainRoutes;
