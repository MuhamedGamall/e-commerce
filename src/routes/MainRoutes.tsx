import { redirect } from "react-router-dom";
import { lazy } from "react";

import { MainLayout } from "../layouts";
import { CategoryPage } from "../pages";

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
    element: <CategoryPage />,
    children: [],
  },
];

export default MainRoutes;
