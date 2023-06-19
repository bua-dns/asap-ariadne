import { useFetch } from "@vueuse/core";
import { useUrl } from "vue-useurl";

export function useFetchSlider(id) {
  const { url, queryParams, pathVariables, path } = useUrl(
    {
      path: "/json/Slider/" + id,
      queryParams: {},
    },
    "https://asap-cms.bua-dns.de"
  );

  const { isFetching, error, data } = useFetch(url).json();

  return {
    isFetching,
    error,
    data,
    url,
  };
}
