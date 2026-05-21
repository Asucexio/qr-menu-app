import dotenv from 'dotenv';
dotenv.config();

import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

try {
  const session = await clerkClient.sessions.createSession({
    userId: "user_3DwVKJR9Yrpgpr3PD3W1TqpxB8d",
  });
  
  // Don't specify a template - get the default JWT
  const token = await clerkClient.sessions.getToken(session.id);
  
  console.log('Session:', session.id);
  console.log('Token:', token);
} catch (error) {
  console.error('Error:', error.errors || error.message);
}