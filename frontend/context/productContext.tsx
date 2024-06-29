"use client";
import axios from "axios";
import { url } from "@/utils/constants";

import React, { createContext, useEffect, useReducer } from "react";
import product_reducer from "@/reducers/productReducer";
import { ProductContextType_interface, Product_interface } from "@/interface";

import {
  ALLOW_OUT_OF_STOCK,
  CHANGE_SORT,
  CHANGE_URL,
  GET_FILTERED_PRODUCTS_BEGIN,
  GET_FILTERED_PRODUCTS_ERROR,
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

const initialState = {
  products: [],
  top_products: [],
  filter_products: [],
  top_products_loading: false,
  top_products_error: false,
  filter_products_loading: false,
  filter_products_error: false,
  products_loading: false,
  filter_string: "",
  products_error: false,
  single_product_loading: false,
  single_product_error: false,
  outOfStock: false,
  max_price: 0,
  min_price: 0,
  brands: [],
  category: [],
  single_product: {},
  sort: "name",
};
export interface Action_interface {
  type: string;
  payload?: any;
}

const ProductContext = createContext({} as ProductContextType_interface);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(product_reducer, initialState);
  const getTopProducts = async () => {
    dispatch({ type: GET_TOP_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(`${url}/products/top`);
      const topProducts = response.data;

      dispatch({ type: GET_TOP_PRODUCTS, payload: topProducts });
    } catch (error) {
      dispatch({ type: GET_TOP_PRODUCTS_ERROR });
      console.log(error);
    }
  };
  const fetchFilteredProducts = async () => {
    dispatch({ type: GET_FILTERED_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(
        url +
          "/products?" +
          `${state.outOfStock ? "stock[gte]=0" : "stock[gte]=1"}` +
          state.filter_string +
          "&sort=" +
          state.sort
      );
      const products = response.data;

      dispatch({ type: GET_FILTERED_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_FILTERED_PRODUCTS_ERROR });
    }
  };
  const fetchProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(url + "/products");
      const products = response.data;

      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  const setSort = (sort: string) => {
    dispatch({ type: CHANGE_SORT, payload: sort });
  };

  const fetchSingleProduct = async (id: string) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios.get(`${url}/products/${id}`);
      const singleProduct = response.data;
      console.log(singleProduct);
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  const changeUrl = (url: string) => {
    dispatch({ type: CHANGE_URL, payload: url });
  };

  const toggleOutOfStock = () => {
    dispatch({ type: ALLOW_OUT_OF_STOCK });
  };

  useEffect(() => {
    fetchProducts();
    getTopProducts();
  }, []);

  useEffect(() => {
    fetchFilteredProducts();
  }, [state.filter_string, state.outOfStock, state.sort]);

  return (
    <ProductContext.Provider
      value={{
        ...state,
        fetchSingleProduct,
        fetchProducts,
        getTopProducts,
        changeUrl,
        toggleOutOfStock,
        setSort,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export const useProductContext = () => {
  return React.useContext(ProductContext);
};
