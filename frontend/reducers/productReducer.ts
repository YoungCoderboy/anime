import { Product_interface } from "@/interface";
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

interface Action {
  type: string;
  payload?: any;
}

interface ProductState {
  top_products: [] | Product_interface[];
  products: [] | Product_interface[];
  top_products_loading: boolean;
  top_products_error: boolean;
  products_loading: boolean;
  products_error: boolean;
  single_product_loading: boolean;
  single_product_error: boolean;
  single_product: object;
}

const product_reducer = (state: ProductState, action: Action) => {
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
      return {
        ...state,
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
        single_product: action.payload,
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
