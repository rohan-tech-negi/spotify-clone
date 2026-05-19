import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "http://localhost:5000/api"
});

axiosInstance.interceptors.request.use((config) => {
	console.log("Axios Request URL:", config.url);
	console.log("Axios Authorization Header:", config.headers["Authorization"]);
	return config;
});