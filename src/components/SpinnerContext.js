"use client"

import { createContext, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export const SpinnerContext = createContext(null);

const SpinnerContextProvider = ({ children }) => {
  const [pageLoader, setPageLoader] = useState(false);
  return (
    <SpinnerContext.Provider
      value={{
        pageLoader,
        setPageLoader,
      }}
    >
     {pageLoader && <LoadingSpinner/>} {children}
    </SpinnerContext.Provider>
  );
};

export default SpinnerContextProvider;
