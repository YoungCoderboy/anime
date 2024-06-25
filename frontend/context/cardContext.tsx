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
interface CartInterface {
  id: string;
  quantity: number;
  product: object;
}
const initialState: {
  cart: [] | CartInterface[];
  total_items: number;
  total_amount: number;
  shipping_fee: number;
} = {
  cart: [],
  total_items: 0,
  total_amount: 0,
  shipping_fee: 50000, // fee is in paisa
};

interface CardContextType {
  cart: [] | CartInterface[];
  total_items: number;
  total_amount: number;
  shipping_fee: number;
  addToCart: (id: string, product: object) => void;
  removeFromCart: (id: string) => void;
  toggleAmount: (id: string, value: string) => void;
  clearCart: () => void;
}

const CardContext = createContext({} as CardContextType);

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(card_reducer, initialState);
  useEffect(() => {
    if (localStorage.getItem("cart") === null) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
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
    if (state.cart.length < 1) {
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
