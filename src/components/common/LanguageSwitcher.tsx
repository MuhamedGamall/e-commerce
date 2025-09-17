import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import { CiGlobe } from "react-icons/ci";
import { Tooltip } from "@mui/material";
import { useT } from "../../hooks";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useGlobalContext();
  const navigate = useNavigate();
  const location = useLocation();
  const t = useT();

  const toggleLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    setLocale(newLocale);
    const pathWithoutLocale =
      location.pathname.split("/").slice(2).join("/") || "";
    navigate(`/${newLocale}/${pathWithoutLocale}${location.search}`);
  };

  return (
    <Tooltip title={t("Common.Navigation.ChangeLanguage")} placement="bottom">
      <div
        className="language-switcher-trigger cursor-pointer flex items-center gap-1"
        onClick={toggleLanguage}
      >
        <CiGlobe size={20} />
        <span className="language-switcher-text">
          {locale === "ar" ? "الأنجليزية" : locale === "en" && "Arabic"}
        </span>
      </div>
    </Tooltip>
  );
}
