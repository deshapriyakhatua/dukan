import connectToDatabase from "@/lib/mongoose";
import User from "@/lib/models/User";

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { name, email, age } = body;

    const newUser = new User({ name, email, age });
    await newUser.save();

    return new Response(JSON.stringify({ message: "User added successfully" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding user:", error);

    return new Response(
      JSON.stringify({ error: "Failed to add user" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
