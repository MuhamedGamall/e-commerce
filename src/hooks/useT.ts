import { useIntl } from "react-intl";
export default function useT(namespace?: string) {
  const intl = useIntl();
  return (key?: string, values?: { [key: string]: any }) => {
    const id = namespace ? `${namespace}.${key}` : key;
    return intl.formatMessage({ id }, values);
  };
}
