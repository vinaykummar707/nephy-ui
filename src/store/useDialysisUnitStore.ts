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
  activeDialysisUnit: DialysisUnit | null;
  dialysisUnits: [DialysisUnit] | [];
  setActiveDialysisUnit: (DialysisUnit: DialysisUnit) => void;
  setDialysisUnits: (DialysisUnit: [DialysisUnit]) => void;
}


const useDialysisUnitStore = create<DialysisUnitState>((set) => ({
  activeDialysisUnit: null, // Initial DialysisUnit state (null when logged out)
  dialysisUnits: [], // Initial DialysisUnit state (null when logged out)

  // Method to set the logged-in DialysisUnit
  setActiveDialysisUnit: (activeDialysisUnit: DialysisUnit) =>
    set({ activeDialysisUnit }),
  setDialysisUnits: (dialysisUnits: [DialysisUnit]) => set({ dialysisUnits }),
}));

export default useDialysisUnitStore;
