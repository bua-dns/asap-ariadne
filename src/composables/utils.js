export function useGetDerivate(url,width,height) {
    if (url && typeof url === 'string') {
        return url.replace('files', `thumbs/${width}x${height}r`)
    }
    return url
}