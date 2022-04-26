import { useEffect, useState } from "react";

export default function useTheme() {

  const query = window?.matchMedia("(prefers-color-scheme: dark)");

  const [theme, setTheme] = useState<"dark" | "light">(
    query?.matches ? "dark" : "light"
  );

  useEffect(() => {
    const listener = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };

    query.addEventListener("change", listener);

    return () => {
      query.removeEventListener("change", listener);
    };
  });

  return theme;
}
