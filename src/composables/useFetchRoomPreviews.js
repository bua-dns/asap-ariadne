import { useFetch } from "@vueuse/core";
import { useUrl } from "vue-useurl";

export function useFetchRoomPreviews() {
  const { url, queryParams, pathVariables, path } = useUrl(
    {
      path: "/json/rooms",
      queryParams: {
        "fields[rooms]": 'title,position',
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
