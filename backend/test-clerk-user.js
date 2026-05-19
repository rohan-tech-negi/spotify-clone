import dotenv from "dotenv";
dotenv.config();
import { clerkClient } from "@clerk/express";
async function test() {
  const users = await clerkClient.users.getUserList();
  if (users.data.length > 0) {
    const user = users.data[0];
    console.log("Does primaryEmailAddress exist?:", user.primaryEmailAddress !== undefined);
    console.log("Keys on user:", Object.keys(user));
  }
}
test().catch(console.error);
