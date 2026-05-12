import { axiosInstance } from "@/lib/axios";

import toast from "react-hot-toast";
import { create } from "zustand";


export const useMusicStore = create((set) => ({
    albums: [],
	songs: [],
}))