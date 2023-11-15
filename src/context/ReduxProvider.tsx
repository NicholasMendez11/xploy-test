"use client";
import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

type prop = {
  children: React.ReactNode;
};
function ReduxProvider({ children }: prop) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
