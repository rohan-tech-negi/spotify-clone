import { axiosInstance } from "@/lib/axios";

import toast from "react-hot-toast";
import { create } from "zustand";


export const useMusicStore = create((set) => ({
    albums: [],
	songs: [],
    isLoading: false,
	error: null,
	currentAlbum: null,

    fetchAlbums: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/albums");
			set({ albums: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

    
}))