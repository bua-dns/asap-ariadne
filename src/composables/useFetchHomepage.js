import { useFetch } from '@vueuse/core';
import { useUrl } from "vue-useurl";

export function useFetchHomepage() {
    const { url, queryParams, pathVariables, path } = useUrl({ 
        path: '/json/homepage',
        queryParams: {
            
        }
    }, 
    'https://asap-cms.bua-dns.de');

    const { isFetching, error, data } = useFetch(url).json();


    return {
        isFetching, error, data
    }
};
