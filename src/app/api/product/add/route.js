import Product from '@/lib/models/Product';
import connectToDatabase from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {

    // Parse the request body
    const body = await request.json();

    // Destructure and validate required fields
    const { name, price, category, subCategory } = body;
    if (!name || !price || !category || !subCategory) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, category, or subCategory' },
        { status: 400 }
      );
    }

    // Optional fields with defaults
    const description = body.description || '';
    const stock = body.stock ?? 0; 
    const images = Array.isArray(body.images) ? body.images : []; 
    const ratings = Array.isArray(body.ratings) ? body.ratings : [];

    await connectToDatabase();

    // Create a new product document
    const product = new Product({
      name,
      description,
      price,
      category,
      subCategory,
      stock,
      images,
      ratings
    });

    // Save to database
    await product.save();

    return NextResponse.json({ message: 'Product created successfully', product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
