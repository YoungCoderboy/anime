export const routeHandler = (
  path: string,
  paramCategory: string | null,
  paramBrands: string[],
  minPrice: number,
  maxPrice: number
) => {
  if (path === "/store") {
    path = "/store?";
  }
  // path = path + `?stock[gte]=1`;
  let filter_string = "";
  if (paramCategory) {
    path = path + `category=${paramCategory}`;
    filter_string = filter_string + `&category=${paramCategory}`;
  }
  if (paramBrands.length > 0) {
    filter_string = filter_string + `&brand=${paramBrands.join(",")}`;
    path = path + `&brand=${paramBrands.join(",")}`;
  }
  if (minPrice !== -1) {
    filter_string = filter_string + `&price[gte]=${minPrice * 100}`;
    path = path + `&price[gte]=${minPrice}`;
  }

  if (maxPrice !== -1) {
    filter_string = filter_string + `&price[lte]=${maxPrice * 100}`;
    path = path + `&price[lte]=${maxPrice}`;
  }

  return { path, filter_string };
};
