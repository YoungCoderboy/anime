import { Action_interface } from "@/context/productContext";
import { Product_interface, ProductState_interface } from "@/interface";
import {
  ALLOW_OUT_OF_STOCK,
  CHANGE_LIMIT,
  CHANGE_PAGE,
  CHANGE_SORT,
  CHANGE_URL,
  GET_FILTERED_PRODUCTS_BEGIN,
  GET_FILTERED_PRODUCTS_SUCCESS,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_ERROR,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_TOP_PRODUCTS,
  GET_TOP_PRODUCTS_BEGIN,
  GET_TOP_PRODUCTS_ERROR,
} from "@/utils/actions";

const product_reducer = (
  state: ProductState_interface,
  action: Action_interface
) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return { ...state, page: action.payload };
    case CHANGE_LIMIT:
      return { ...state, limit: action.payload };
    case CHANGE_SORT:
      return { ...state, sort: action.payload };
    case ALLOW_OUT_OF_STOCK:
      return { ...state, outOfStock: !state.outOfStock };
    case CHANGE_URL:
      return { ...state, filter_string: action.payload };
    case GET_TOP_PRODUCTS_BEGIN:
      return { ...state, top_products_loading: true };
    case GET_PRODUCTS_BEGIN:
      return { ...state, products_loading: true };
    case GET_TOP_PRODUCTS:
      return {
        ...state,
        top_products: action.payload.data.data,
        top_products_loading: false,
      };
    case GET_TOP_PRODUCTS_ERROR:
      return {
        ...state,
        top_products_loading: false,
        top_products_error: true,
      };
    case GET_FILTERED_PRODUCTS_BEGIN:
      return { ...state, filter_products_loading: true };
    case GET_PRODUCTS_ERROR:
      return { ...state, products_loading: false, products_error: true };
    case GET_FILTERED_PRODUCTS_SUCCESS:
      return {
        ...state,
        filter_products: action.payload.data.data,
        filter_products_loading: false,
      };
    case GET_PRODUCTS_SUCCESS:
      let categories = action.payload.data.data.map(
        (product: Product_interface) => {
          return product.category;
        }
      );
      let uniqueCategories = new Set(categories);
      let array = Array.from(uniqueCategories);
      categories = [...array];

      let brands = action.payload.data.data.map(
        (product: Product_interface) => {
          return product.brand;
        }
      );
      let uniqueBrands = new Set(brands);
      let brandArray = Array.from(uniqueBrands);
      brands = [...brandArray];
      const prices = action.payload.data.data.map(
        (product: Product_interface) => {
          return product.price;
        }
      );
      const max_price = Math.max(...prices);
      const min_price = Math.min(...prices);
      return {
        ...state,
        category: categories,
        brands: brands,
        min_price: min_price,
        max_price: max_price,
        products_loading: false,
        products: action.payload.data.data,
      };
    case GET_PRODUCTS_ERROR:
      return { ...state, products_loading: false, products_error: true };
    case GET_SINGLE_PRODUCT_BEGIN:
      return {
        ...state,
        single_product_loading: true,
        single_product_error: false,
      };
    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        single_product_loading: false,
        single_product: action.payload.data.data,
      };
    case GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        single_product_loading: false,
        single_product_error: true,
      };
    default:
      return state;
  }
};

export default product_reducer;
