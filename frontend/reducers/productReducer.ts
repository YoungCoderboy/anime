import { Action_interface } from "@/context/productContext";
import { Product_interface, ProductState_interface } from "@/interface";
import {
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
    case GET_PRODUCTS_SUCCESS:
      let categories = action.payload.data.data.map(
        (product: Product_interface) => {
          return product.category;
        }
      );
      let uniqueCategories = new Set(categories);
      let array = Array.from(uniqueCategories);
      categories = ["All", ...array];

      let brands = action.payload.data.data.map(
        (product: Product_interface) => {
          return product.brand;
        }
      );
      let uniqueBrands = new Set(brands);
      let brandArray = Array.from(uniqueBrands);
      brands = ["All", ...brandArray];
      return {
        ...state,
        category: categories,
        brands: brands,
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
