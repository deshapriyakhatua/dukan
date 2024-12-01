import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongoose";
import Cart from "@/models/Cart";

export async function POST(req) {
    try {
        const userId = req.headers.get('x-user-id');
        const { productId } = await req.json();

        if (!userId || !productId) {
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
                { status: 400 }
            );
        }

        await connectToDatabase();

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return new Response(
                JSON.stringify({ error: "Cart not found" }),
                { status: 404 }
            );
        }

        const item = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (!item) {
            return new Response(
                JSON.stringify({ error: "Product not found in cart" }),
                { status: 404 }
            );
        }

        // remove the product 
        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        await cart.save();

        return new Response(
            JSON.stringify({ message: "Cart updated successfully", cart }),
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 }
        );
    }

}
