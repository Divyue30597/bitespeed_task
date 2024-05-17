import { useContext } from "react";
import AppStateContext from "../context/AppStateContext";

export default function useAppState() {
  const context = useContext(AppStateContext);

  if (!context || context === null) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return context;
}
