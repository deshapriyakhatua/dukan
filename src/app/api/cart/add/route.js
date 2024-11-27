import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongoose';
import Cart from '@/lib/models/Cart';

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
