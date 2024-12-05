
import connectToDatabase from '@/lib/mongoose';
import Address from '@/models/Address';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
    try {

        const userId = request.headers.get('x-user-id');
        const {addressId} = await request.json();

        if (!userId || !addressId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Connect to the database
        await connectToDatabase();

        // Delete address from the database
        const deletedAddress = await Address.findOneAndDelete({user: userId, _id:addressId});

        if(!deletedAddress) {
            return NextResponse.json({error: 'Address not found'}, { status: 404 });
        }

        // Return the response
        return NextResponse.json({ message: 'Address deleted successfully', address: deletedAddress }, { status: 200 });
    } catch (error) {
        console.error('Error deleting addresses:', error);
        return NextResponse.json({ error: 'Failed to delete addresses' }, { status: 500 });
    }
}
