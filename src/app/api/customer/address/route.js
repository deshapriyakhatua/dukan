
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

export async function POST(request) {
    try {

        const userId = request.headers.get('x-user-id');
        // Parse the request body
        const { updatedData } = await request.json();
        
        // Validate input
        if (!userId || !updatedData) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { fullName, phone, pincode, locality, address, district, state, country, landmark, alternatePhone } = updatedData;

        // Validate required fields
        if (!fullName || !phone || !pincode || !locality || !address || !district || !state || !country) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // input fields validation
        if (fullName.length <= 3) {
            return NextResponse.json(
                { error: 'Full name must contain atleast 4 letters' },
                { status: 400 }
            );
        }
        if (phone.length !== 10 || !/^\d+$/.test(phone)) {
            return NextResponse.json(
                { error: 'Phone number must be 10 digits.' },
                { status: 400 }
            );
        }
        if (alternatePhone.length !== 10 || !/^\d+$/.test(alternatePhone)) {
            return NextResponse.json(
                { error: 'Alternate phone number must be 10 digits.' },
                { status: 400 }
            );
        }
        if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
            return NextResponse.json(
                { error: 'Pincode must be 6 digits.' },
                { status: 400 }
            );
        }
        if (locality.length <= 3) {
            return NextResponse.json(
                { error: 'Locality must contain atleast 4 letters' },
                { status: 400 }
            );
        }
        if (address.length <= 3) {
            return NextResponse.json(
                { error: 'Address must contain atleast 4 letters' },
                { status: 400 }
            );
        }
        if (district.length <= 2) {
            return NextResponse.json(
                { error: 'City/District/Town must contain atleast 3 letters' },
                { status: 400 }
            );
        }
        if (landmark.length <= 2) {
            return NextResponse.json(
                { error: 'Landmark must contain atleast 3 letters' },
                { status: 400 }
            );
        }

        // Connect to the database
        await connectToDatabase();

        // Add new address
        const newAddress = await Address.create({
            fullName,
            phone,
            pincode,
            locality,
            address,
            district,
            state,
            country,
            landmark,
            alternatePhone,
            user: userId,
          });
      

        // Return the added address
        return NextResponse.json(
            { message: 'Address added successfully', address: newAddress },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding address:', error);
        return NextResponse.json(
            { error: 'Failed to add new address' },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {

        const userId = request.headers.get('x-user-id');
        // Parse the request body
        const { addressId, updatedData } = await request.json();

        // Validate input
        if (!userId || !addressId || !updatedData) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Connect to the database
        await connectToDatabase();

        // Find the address by ID and update it
        const updatedAddress = await Address.findOneAndUpdate(
            { _id: addressId, user: userId },
            { $set: updatedData }, // Update fields
            { new: true, runValidators: true } // Return the updated document and validate fields
        );

        if (!updatedAddress) {
            return NextResponse.json(
                { error: 'Address not found' },
                { status: 404 }
            );
        }

        // Return the updated address
        return NextResponse.json(
            { message: 'Address updated successfully', address: updatedAddress },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating address:', error);
        return NextResponse.json(
            { error: 'Failed to update address' },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {

        const userId = request.headers.get('x-user-id');
        const { addressId } = await request.json();

        if (!userId || !addressId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Connect to the database
        await connectToDatabase();

        // Delete address from the database
        const deletedAddress = await Address.findOneAndDelete({ user: userId, _id: addressId });

        if (!deletedAddress) {
            return NextResponse.json({ error: 'Address not found' }, { status: 404 });
        }

        // Return the response
        return NextResponse.json({ message: 'Address deleted successfully', address: deletedAddress }, { status: 200 });
    } catch (error) {
        console.error('Error deleting addresses:', error);
        return NextResponse.json({ error: 'Failed to delete addresses' }, { status: 500 });
    }
}