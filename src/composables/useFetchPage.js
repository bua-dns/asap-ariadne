import { useFetch } from "@vueuse/core";
import { useUrl } from "vue-useurl";

export function useFetchPage(slug) {
  const { url, queryParams, pathVariables, path } = useUrl(
    {
      path: "/json/pages/" + slug,
      queryParams: {
        
      },
    },
    "https://asap-cms.bua-dns.de"
  );

  const { isFetching, error, data } = useFetch(url).json();

  return {
    isFetching,
    error,
    data,
  };
}
