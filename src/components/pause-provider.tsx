"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";

type PauseContextType = {
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
};
export const PauseContext = createContext<PauseContextType>(
  {} as PauseContextType
);

export function PauseProvider({ children }: { children: React.ReactNode }) {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  return (
    <PauseContext.Provider value={{ isPaused, setIsPaused }}>
      {children}
    </PauseContext.Provider>
  );
}
