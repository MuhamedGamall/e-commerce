export function truncateText(text, maxLength = 30) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
}

export function flattenMessages(nestedMessages: any, prefix = "") {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object" && value !== null) {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    } else {
      messages[prefixedKey] = value;
    }

    return messages;
  }, {});
}
