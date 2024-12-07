import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Product from '@/models/Product';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
    const id = (await params).id; // Get the `id` from the dynamic URL

    try {
        
        if (!id) {
            return NextResponse.json({ error: 'Invalid product ID', id }, { status: 400 });
        }
        
        // Convert string to ObjectId
        const objectId = mongoose.Types.ObjectId.createFromHexString(id);

        // Connect to the database
        await connectToDatabase();

        // Find the product by its ID
        const product = await Product.findById(objectId);

        // If product not found, return a 404 error
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // Return the product data
        return NextResponse.json( product );
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}
