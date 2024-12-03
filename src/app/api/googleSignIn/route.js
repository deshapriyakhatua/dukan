import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(req) {

  try {

    const body = await req.json();
    const { id, name, email, image } = body;

    // Validate required fields
    if (!id || !name || !email || !image) {
      return new Response(
        JSON.stringify({ error: "Credentials are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await connectToDatabase();

    // Check if user already exists
    let user = await User.findOne({ email });
    if (!user) {

      user = await User.create({ googleId: id, name, email, image });

      return new Response(
        JSON.stringify({ message: "User added successfully",  user}),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );

    } else {
      return new Response(
        JSON.stringify({ message: "User already added", user }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

  } catch (error) {

    console.error("Error adding google OAuth user to database:", error);

    return new Response(
      JSON.stringify({ error: "Failed to add google OAuth user to database" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );

  }

}
