"use client";
import user_reducer from "@/reducers/siteReducer";
import { SIDEBAR_CLICK, USER_ICON_CLICK } from "@/utils/actions";
import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  showUserMenu: false,
  showSidebar: false,
};
interface SiteContextType {
  showUserMenu: boolean;
  handleMenuClick: () => void;

  handleSidebarClick: () => void;
  showSidebar: boolean;
}

const SiteContext = createContext({} as SiteContextType);

export const SiteProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(user_reducer, initialState);
  const handleMenuClick = () => {
    dispatch({ type: USER_ICON_CLICK });
  };

  const handleSidebarClick = () => {
    dispatch({ type: SIDEBAR_CLICK });
  };

  return (
    <SiteContext.Provider
      value={{
        ...state,
        handleMenuClick,
        handleSidebarClick,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteContext = () => useContext(SiteContext);
