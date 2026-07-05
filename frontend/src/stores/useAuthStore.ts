import type { User } from "@/types";
import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
	user: User | null;
	isArtist: boolean;
	isLoading: boolean;
	error: string | null;

	fetchUserProfile: () => Promise<void>;
	becomeArtist: () => Promise<boolean>;
	becomeListener: () => Promise<boolean>;
	reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	isArtist: false,
	isLoading: false,
	error: null,

	fetchUserProfile: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/users/me");
			set({
				user: response.data,
				isArtist: response.data.isArtist,
			});
		} catch (error: any) {
			set({
				user: null,
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
			set({
				user: response.data,
				isArtist: response.data.isArtist,
				isLoading: false,
			});
			return true;
		} catch (error: any) {
			set({
				isLoading: false,
				error: error.response?.data?.message ?? "Failed to switch to artist account",
			});
			return false;
		}
	},

	becomeListener: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.post("/users/become-listener");
			set({
				user: response.data,
				isArtist: response.data.isArtist,
				isLoading: false,
			});
			return true;
		} catch (error: any) {
			set({
				isLoading: false,
				error: error.response?.data?.message ?? "Failed to switch to listener account",
			});
			return false;
		}
	},

	reset: () => {
		set({ user: null, isArtist: false, isLoading: false, error: null });
	},
}));
