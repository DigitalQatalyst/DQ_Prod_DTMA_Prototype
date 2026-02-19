import { createContext, useContext, useState, ReactNode } from "react";

type UserFlow = "learner" | "provider" | null;

interface FlowContextType {
  flow: UserFlow;
  setFlow: (flow: UserFlow) => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export function FlowProvider({ children }: { children: ReactNode }) {
  const [flow, setFlow] = useState<UserFlow>(null);

  return (
    <FlowContext.Provider value={{ flow, setFlow }}>
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useFlow must be used within FlowProvider");
  }
  return context;
}
