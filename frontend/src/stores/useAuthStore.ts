import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
	isAdmin: boolean;
	isLoading: boolean;
	error: string | null;

	checkAdminStatus: () => Promise<void>;
	reset: () => void;
}