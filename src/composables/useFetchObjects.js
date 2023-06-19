import { useFetch } from '@vueuse/core';
import { useUrl } from "vue-useurl";

export function useFetchObjects(ids) {
    ids = ids.join(',')
    const { url, queryParams, pathVariables, path } = useUrl({ 
        path: '/json/objects',
        queryParams: {
            'filter[ids]': ids
        }
    }, 
    'https://asap-cms.bua-dns.de');

    const { isFetching, error, data } = useFetch(url).json();


    return {
        // isFetching, error, data
        url
    }
};
