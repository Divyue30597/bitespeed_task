import { Dispatch, ReactNode, createContext, useState } from "react";

interface AppStateProps {
  isDragging: boolean;
  setIsDragging: Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
}

const AppStateContext = createContext<AppStateProps | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  // One context
  const [isDragging, setIsDragging] = useState(false);
  const [value, setValue] = useState("");

  return (
    <AppStateContext.Provider
      value={{ isDragging, setIsDragging, value, setValue }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export default AppStateContext;
