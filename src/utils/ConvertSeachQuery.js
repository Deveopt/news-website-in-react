

export const ConvertSearchQuery = (query) => {
    const searchquery = query.replace(/ /g, '+');
    return searchquery;
};