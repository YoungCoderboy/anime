"use client";

import React, { createContext, useEffect, useReducer } from "react";

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  TOGGLE_CART_ITEM_AMOUNT,
  COUNT_CART_TOTALS,
} from "../utils/actions";

import card_reducer from "@/reducers/cardReducer";

const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};

const initialState: {
  cart: [];
  total_items: number;
  total_amount: number;
  shipping_fee: number;
} = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 50000, // fee is in paisa
};

interface CardContextType {
  cart: [];
  total_items: number;
  total_amount: number;
  shipping_fee: number;
  addToCart: (id: number, product: object) => void;
  removeFromCart: (id: number) => void;
  toggleAmount: (id: number, value: string) => void;
  clearCart: () => void;
}

const CardContext = createContext({} as CardContextType);

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(card_reducer, initialState);

  const addToCart = (id: number, product: object, quantity: number = 1) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, quantity, product },
    });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  };

  const toggleAmount = (id: number, value: string) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  useEffect(() => {
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
