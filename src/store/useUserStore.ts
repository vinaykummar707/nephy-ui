// store/useUserStore.ts
import { create } from 'zustand';

// Define the Zustand store

export interface User {
	email: string;
	role: string;
	_id?: string;
}
interface UserState {
	user: User | null;
	setUser: (user: User) => void;
	logout: () => void;
}

const getUser = () => {
	const userFromLStorage = localStorage.getItem('user');
	if (userFromLStorage) {
		return JSON.parse(userFromLStorage);
	}
	return null;
};

const useUserStore = create<UserState>((set) => ({
	user: getUser(), // Initial user state (null when logged out)

	// Method to set the logged-in user
	setUser: (user: User) => set({ user }),

	// Method to log out the user
	logout: () => {
		localStorage.clear();
		set({ user: null });
	},
}));

export default useUserStore;
