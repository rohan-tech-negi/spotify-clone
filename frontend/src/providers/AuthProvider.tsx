import { axiosInstance } from '@/lib/axios';
import { useAuth } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'

const updateApiToken = (token: string | null) => {
	if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = () => {
    const { getToken, userId } = useAuth();
	const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const initAuth = async () => {
			try {
				const token = await getToken();
				updateApiToken(token);
				if (token) {
					await checkAdminStatus();
					// init socket
					if (userId) initSocket(userId);
				}
			} catch (error: any) {
				updateApiToken(null);
				console.log("Error in auth provider", error);
			} finally {
				setLoading(false);
			}
		};


    })
  return (
    <div>AuthProvider</div>
  )
}

export default AuthProvider