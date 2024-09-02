// store/useDialysisUnitStore.ts
import { create } from "zustand";

// Define the Zustand store

export interface DialysisUnit {
  unitName: string;
  description: string;
  hospitalId: string;
  _id: string;
}
interface DialysisUnitState {
  dialysisUnit: DialysisUnit | null;
  setDialysisUnit: (DialysisUnit: DialysisUnit) => void;
}

// const getDialysisUnit = () => {
//   const DialysisUnitFromLStorage = localStorage.getItem("DialysisUnit");
//   if (DialysisUnitFromLStor
//   age) {
//     return JSON.parse(DialysisUnitFromLStorage);
//   }
//   return null;
// };

const useDialysisUnitStore = create<DialysisUnitState>((set) => ({
  dialysisUnit: null, // Initial DialysisUnit state (null when logged out)

  // Method to set the logged-in DialysisUnit
  setDialysisUnit: (dialysisUnit: DialysisUnit) => set({ dialysisUnit }),
}));

export default useDialysisUnitStore;
