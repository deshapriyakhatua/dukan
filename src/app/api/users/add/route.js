import connectToDatabase from "@/lib/mongoose";
import User from "@/lib/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { phone, password, name, email } = body;

    // Validate required fields
    if (!phone && !password) {
      return new Response(
        JSON.stringify({ error: "Phone and password are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    if (!phone) {
      return new Response(
        JSON.stringify({ error: "Phone No is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    if (!password) {
      return new Response(
        JSON.stringify({ error: "Password is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Additional validation for phone and password
    if (typeof phone !== "number") {
      return new Response(
        JSON.stringify({ error: "Phone number type must be number" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    if (String(phone).length < 10) {
      return new Response(
        JSON.stringify({ error: "Phone number should contain 10 digits" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (typeof password !== "string") {
      return new Response(
        JSON.stringify({ error: "Password must be string" }),
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

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User already registered" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ phone, password: hashedPassword, name, email });
    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User added successfully" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding user:", error);

    return new Response(
      JSON.stringify({ error: "Failed to add user" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
