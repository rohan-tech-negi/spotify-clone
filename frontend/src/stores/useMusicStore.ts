import { axiosInstance } from "@/lib/axios";

// import toast from "react-hot-toast";
import { create } from "zustand";



interface MusicStore {
	songs: any[];
	albums: any[];
	isLoading: boolean;
	error: string | null;

    fetchAlbums: () => Promise<void>;
}


export const useMusicStore = create<MusicStore>((set) => ({
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