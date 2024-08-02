// "use client";

// import { createContext, useContext, useState } from "react";

// const ReservationContext = createContext();

// const initialState = { from: undefined, to: undefined };

// function ReservationProvider({ children }) {
//   const [range, setRange] = useState(initialState);
//   const resetRange = () => setRange(initialState);

//   return (
//     <ReservationContext.Provider value={{ range, setRange, resetRange }}>
//       {children}
//     </ReservationContext.Provider>
//   );
// }

// function useReservation() {
//   const context = useContext(ReservationContext);
//   if (context === undefined)
//     throw new Error("Context was used outside provider");
//   return context;
// }

// export { ReservationProvider, useReservation };

"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Range {
  from?: Date;
  to?: Date;
}

interface ReservationContextType {
  range: Range;
  setRange: React.Dispatch<React.SetStateAction<Range>>;
  resetRange: () => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

const initialState: Range = { from: undefined, to: undefined };

interface ReservationProviderProps {
  children: ReactNode;
}

function ReservationProvider({ children }: ReservationProviderProps) {
  const [range, setRange] = useState<Range>(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation(): ReservationContextType {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { ReservationProvider, useReservation };
