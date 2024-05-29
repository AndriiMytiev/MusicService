import { useContext } from "react";
import RootStore, { RootStoreContext } from "../stores";

export const useStore = (): RootStore => {
  const store = useContext(RootStoreContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};
