import { createContext, useContext, useState } from "react";

interface QuoteProgressContextType {
  step: number;
  setStep: (step: number) => void;
}

const QuoteProgressContext = createContext<
  QuoteProgressContextType | undefined
>(undefined);

export function QuoteProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [step, setStep] = useState(0);

  return (
    <QuoteProgressContext.Provider value={{ step, setStep }}>
      {children}
    </QuoteProgressContext.Provider>
  );
}

export function useQuoteProgress() {
  const context = useContext(QuoteProgressContext);
  if (!context)
    throw new Error(
      "useQuoteProgress must be used within QuoteProgressProvider"
    );
  return context;
}
