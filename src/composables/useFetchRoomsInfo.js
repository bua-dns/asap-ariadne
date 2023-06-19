import { useFetch } from '@vueuse/core';
import { useUrl } from "vue-useurl";

export function useFetchRoomsInfo() {
    const { url, queryParams, pathVariables, path } = useUrl({ 
        path: '/json/rooms',
        queryParams: {
            'fields[rooms]': 'position,title'
        }
    }, 
    'https://asap-cms.bua-dns.de');

    const { isFetching, error, data } = useFetch(url).json();

    return {
        isFetching, error, data
    }
};