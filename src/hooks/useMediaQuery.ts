import { useState, useEffect, useMemo, useCallback } from "react";

type Query =
  | "sm-up"
  | "md-up"
  | "lg-up"
  | "xl-up"
  | "sm-down"
  | "md-down"
  | "lg-down"
  | "xl-down";
const useMediaQuery = (query: Query) => {
  const media = useMemo(
    () =>
      new Map([
        ["sm-up", "(min-width: 601px)"],
        ["md-up", "(min-width: 961px)"],
        ["lg-up", "(min-width: 1201px)"],
        ["xl-up", "(min-width: 1921px)"],
        ["sm-down", "(max-width: 600px)"],
        ["md-down", "(max-width: 960px)"],
        ["lg-down", "(max-width: 1200px)"],
        ["xl-down", "(max-width: 1920px)"],
      ]),
    []
  );
  const getMatch = (mediaQuery: string) => {
    return window.matchMedia(mediaQuery).matches;
  };
  const [matches, setMatches] = useState(getMatch(media.get(query) as string));
  const handleChange = useCallback(() => {
    setMatches(getMatch(media.get(query) as string));
  }, [query, media]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(media.get(query) as string);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [handleChange, media, query]);

  return matches;
};
export default useMediaQuery;
