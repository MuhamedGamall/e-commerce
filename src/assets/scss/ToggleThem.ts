// styles.ts
export const ToggleThem = (theme: any) => ({
  color: theme?.palette?.mode === "dark" ? "#fff" : "#1A1D2D"
});
