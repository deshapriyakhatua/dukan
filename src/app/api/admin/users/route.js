import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";

export async function GET(req) {
  try {

    const userId = req.headers.get('x-user-id');
    // Connect to the database
    await connectToDatabase();

    // Fetch all users from the database
    const users = await User.find();

    // Return the data as JSON
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    return new Response(
      JSON.stringify({ error: "Failed to fetch users" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
