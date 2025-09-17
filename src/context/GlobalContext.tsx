import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CurrentUserModel } from "../models/user/CurrentUserModel";
// import { GetCurrentUser } from "../services/CurrentUserService";

interface GlobalContextProps {
  currentUser: CurrentUserModel | null | undefined;
  setCurrentUser: (user: CurrentUserModel | null) => void;
  locale: string;
  setLocale: (lang: string) => void;
  defaultValue: string
}

const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps);
const defaultValue = 'en'
export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUserModel | null>();
  const [locale, setLocale] = useState<string>(() => {
    return localStorage.getItem("locale") || "en";
  });

  useEffect(() => {
    if (window && localStorage.getItem("token")) {
      setCurrentUser(GetCurrentUser());
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  return (
    <GlobalContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        locale,
        setLocale,
        defaultValue
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
