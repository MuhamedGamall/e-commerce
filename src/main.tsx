import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import I18nProvider from "./i18n";
import router from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { GlobalProvider, useGlobalContext } from "./context/GlobalContext";
import "./assets/scss/main.scss";

export default function IntlWrapper() {
  const { locale } = useGlobalContext();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return (
    <I18nProvider locale={locale as "en" | "ar"}>
      <RouterProvider router={router} />
    </I18nProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        stacked
        hideProgressBar
        className="costum-toast"
      />
      <IntlWrapper />
    </GlobalProvider>
  </React.StrictMode>
);
