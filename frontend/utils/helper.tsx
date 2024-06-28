export const routeHandler = (
  path: string,
  paramCategory: string | null,
  paramBrands: string[]
) => {
  if (path === "/store") {
    path = "/store?";
  }
  if (paramCategory) {
    path = path + `category=${paramCategory}`;
  }
  if (paramBrands.length > 0) {
    path = path + `&brands=${paramBrands.join(",")}`;
  }
  return path;
};
