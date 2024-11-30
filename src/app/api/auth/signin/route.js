import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";

export async function POST(req) {
  try {

    const body = await req.json();
    const { phone, password } = body;

    // Validate required fields
    if (!phone || !password) {
      return new Response(
        JSON.stringify({ error: "Phone and password are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Additional validation for phone and password
    if (typeof phone !== "string") {
      return new Response(
        JSON.stringify({ error: "Phone must be a string" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      return new Response(
        JSON.stringify({ error: "Phone number must contain exactly 10 digits" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (typeof password !== "string") {
      return new Response(
        JSON.stringify({ error: "Password must be a string" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (password.length < 6) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 6 characters" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await connectToDatabase();

    // Find user by phone number
    const user = await User.findOne({ phone });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Generate a session
    await createSession(user._id); // Pass the user's unique identifier to create a session

    // Send success response
    return new Response(
      JSON.stringify({ message: "Login successful" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (error) {

    console.error("Error during login:", error);

    return new Response(
      JSON.stringify({ error: "Failed to login" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );

  }
  
}
