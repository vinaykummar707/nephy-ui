// store/useHospitalStore.ts
import { Hospital } from "iconsax-react";
import { create } from "zustand";

// Define the Zustand store

export interface Hospital {
  name: string;
  branch: string;
  address: string;
  pincode: number;
  phone: number;
  googleMapCoords: {
    latitude: number;
    longitude: number;
  };
  createdBy: string;
  isActive: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
interface HospitalState {
  hospital: Hospital | null;
  setHospital: (Hospital: Hospital) => void;
}

// const getHospital = () => {
//   const HospitalFromLStorage = localStorage.getItem("Hospital");
//   if (HospitalFromLStorage) {
//     return JSON.parse(HospitalFromLStorage);
//   }
//   return null;
// };

const useHospitalStore = create<HospitalState>((set) => ({
  hospital: null, // Initial Hospital state (null when logged out)

  // Method to set the logged-in Hospital
  setHospital: (hospital: Hospital) => set({ hospital }),
}));

export default useHospitalStore;
