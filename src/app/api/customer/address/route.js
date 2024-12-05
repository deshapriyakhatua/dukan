
import connectToDatabase from '@/lib/mongoose';
import Address from '@/models/Address';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {

        const userId = request.headers.get('x-user-id');

        if (!userId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Connect to the database
        await connectToDatabase();

        // Fetch all addresses from the database
        const addresses = await Address.find({ user: userId });

        // Return the response
        return NextResponse.json(addresses, { status: 200 });
    } catch (error) {
        console.error('Error fetching addresses:', error);
        return NextResponse.json({ error: 'Failed to fetch addresses' }, { status: 500 });
    }
}
