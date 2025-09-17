import { IntlProvider } from "react-intl";
import { ReactNode, useEffect, useState } from "react";
import { flattenMessages } from "../utils";

type Props = {
  children: ReactNode;
  locale: "en" | "ar";
};

export default function I18nProvider({ children, locale }: Props) {
  const [messages, setMessages] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadMessages = async () => {
      try {
        const rawMessages = (await import(`../../locales/${locale}.json`))
          .default;
        if (isMounted) {
          setMessages(flattenMessages(rawMessages));
          setError(false);
        }
      } catch (err) {
        console.error(`Error loading ${locale} messages`, err);
        if (isMounted) {
          setError(true);
        }
      }
    };

    loadMessages();
    return () => {
      isMounted = false;
    };
  }, [locale]);

  if (error) {
    return <div>Translation file not found</div>;
  }

  if (!messages) {
    return;
  }

  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      {children}
    </IntlProvider>
  );
}
