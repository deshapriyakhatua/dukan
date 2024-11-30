import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongoose';
import Cart from '@/models/Cart';
import Product from '@/models/Product';

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
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
