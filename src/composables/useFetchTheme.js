import { useFetch } from "@vueuse/core";
import { useUrl } from "vue-useurl";

export function useFetchTheme() {
  const { url, queryParams, pathVariables, path } = useUrl(
    {
      path: "/json/theme_content",
      queryParams: {
        
      },
    },
    "https://asap-cms.bua-dns.de"
  );

  const { isFetching:themeIsFetching, error:themeError, data:themeData } = useFetch(url).json();

  return {
    themeIsFetching,
    themeError,
    themeData,
  };
}
