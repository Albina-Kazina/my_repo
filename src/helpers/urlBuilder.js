export const urlBuilder = (urlTmp,  queryArgs) => {
    let res = urlTmp;
    if (queryArgs) {
        const queryString = Object.keys(queryArgs)
            .filter(key => queryArgs[key] != null)
            .map(key => `${key}=${encodeURIComponent(Array.isArray(queryArgs[key]) ? JSON.stringify(queryArgs[key]) : queryArgs[key])}`)
            .join('&');
        res += `?${queryString}`;
    }

    return res;
};