import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
	console.log("protectRoute hit!");
	console.log("req.auth:", req.auth);
	console.log("req.headers.authorization:", req.headers.authorization?.substring(0, 20) + "...");
	if (!req.auth.userId) {
		return res.status(401).json({ message: "Unauthorized - you must be logged in" });
	}
	next();
};

export const requireAdmin = async (req, res, next) => {
	try {
		const currentUser = await clerkClient.users.getUser(req.auth.userId);
		
		console.log("ADMIN_EMAIL from env:", process.env.ADMIN_EMAIL);
		console.log("Current user email:", currentUser.primaryEmailAddress?.emailAddress);
		console.log("Current user all emails:", currentUser.emailAddresses.map(e => e.emailAddress));
		
		const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

		if (!isAdmin) {
			return res.status(403).json({ message: "Unauthorized - you must be an admin" });
		}

		next();
	} catch (error) {
		next(error);
	}
};