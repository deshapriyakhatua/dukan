import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongoose';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import User from '@/models/User';

export async function GET(req) {
  try {
    await connectToDatabase();

    const userId = req.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    // Find the cart for the specified user and populate related fields
    const cart = await Cart.findOne({ user: mongoose.Types.ObjectId.createFromHexString(userId) })
      .populate('items.product', 'name price images'); // Populate product details

    if (!cart) {
      return NextResponse.json({ message: 'Cart not found for this user' }, { status: 404 });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const userId = req.headers.get('x-user-id');
    const { productId, quantity } = await req.json();
    
    await connectToDatabase();

    if (!userId || !productId || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, productId, or quantity' },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if(!user) {
      return NextResponse.json(
        { error: 'Sign In to add product' },
        { status: 400 }
      );
    }

    // Find or create a cart for the user
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    // Check if the product already exists in the cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      // Update the quantity if the product exists
      existingItem.quantity += quantity;
    } else {
      // Add the new product to the cart
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    return NextResponse.json({ message: 'Product added to cart successfully', cart }, { status: 200 });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
      const userId = req.headers.get('x-user-id');
      const { productId, action } = await req.json();

      if (!userId || !productId || !action) {
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

      if (action === "increment") {
          item.quantity += 1;
      } else if (action === "decrement") {
          if (item.quantity > 1) {
              item.quantity -= 1;
          }
      } else {
          return new Response(
              JSON.stringify({ error: "Invalid action" }),
              { status: 400 }
          );
      }

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

export async function DELETE(req) {
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
          JSON.stringify({ message: "Item removed from cart successfully", cart }),
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