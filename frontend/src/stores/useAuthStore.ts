import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
	isArtist: boolean;
	isLoading: boolean;
	error: string | null;

	fetchUserProfile: () => Promise<void>;
	becomeArtist: () => Promise<boolean>;
	reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	isArtist: false,
	isLoading: false,
	error: null,

	fetchUserProfile: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/users/me");
			set({ isArtist: response.data.isArtist });
		} catch (error: any) {
			set({
				isArtist: false,
				error: error.response?.data?.message ?? "Failed to load profile",
			});
		} finally {
			set({ isLoading: false });
		}
	},

	becomeArtist: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.post("/users/become-artist");
			set({ isArtist: response.data.isArtist, isLoading: false });
			return true;
		} catch (error: any) {
			set({
				isArtist: false,
				isLoading: false,
				error: error.response?.data?.message ?? "Failed to register as artist",
			});
			return false;
		}
	},

	reset: () => {
		set({ isArtist: false, isLoading: false, error: null });
	},
}));
