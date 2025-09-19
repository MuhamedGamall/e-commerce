import { redirect } from "react-router-dom";

import { lazy } from "react";
const ProductPage = lazy(() => import("../pages/product-details"));
import { MainLayout } from "../layouts";
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
        path: "product-details",
        element: <ProductPage />,
      },
    ],
  },
];
export default MainRoutes;
