import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface ChatStore{
    users: any[]
    fetchUsers: () => Promise<void>;
    isLoading: boolean;

}


export const useChatStore = create<ChatStore>(()=>{
    users: [],
    	fetchUsers: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/users");
			set({ users: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
})