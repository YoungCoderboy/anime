"use client";

import React, { createContext, useEffect, useReducer } from "react";

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  TOGGLE_CART_ITEM_AMOUNT,
  COUNT_CART_TOTALS,
  CARTLOAD,
} from "../utils/actions";

import card_reducer from "@/reducers/cardReducer";
import { CardContextType, CartInterface, Product_interface } from "@/interface";

const initialState = {
  cart: [] as CartInterface[],
  total_items: 0,
  total_amount: 0,
  shipping_fee: 50000, // fee is in paisa
};

const CardContext = createContext({} as CardContextType);

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(card_reducer, initialState);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    dispatch({ type: CARTLOAD, payload: cart });
  }, []);

  const addToCart = (id: string, product: object, quantity: number = 1) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, quantity, product },
    });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  };

  const toggleAmount = (id: string, value: string) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  useEffect(() => {
    if (state.cart.length == 0) {
      return;
    }
    localStorage.setItem("cart", JSON.stringify(state.cart));
    dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]);

  return (
    <CardContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        toggleAmount,
        clearCart,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  return React.useContext(CardContext);
};
