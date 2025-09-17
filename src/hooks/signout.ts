import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

const useSignout = () => {
  const navigate = useNavigate();
  const {locale} = useIntl()
  const signout = () => {
    localStorage.removeItem("token");
    return navigate(`/${locale}/login`, { replace: true });
  };

  return { signout };
};

export default useSignout;
