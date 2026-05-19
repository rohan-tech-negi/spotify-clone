import dotenv from "dotenv";
dotenv.config();
import { clerkClient } from "@clerk/express";
async function test() {
  const users = await clerkClient.users.getUserList();
  if (users.data.length > 0) {
    const user = users.data[0];
    console.log("User email addresses:", JSON.stringify(user.emailAddresses, null, 2));
    console.log("Primary email:", user.primaryEmailAddress?.emailAddress);
    console.log("Primary email address ID:", user.primaryEmailAddressId);
  } else {
    console.log("No users found");
  }
}
test().catch(console.error);
