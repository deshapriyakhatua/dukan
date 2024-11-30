import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';
import Address from '@/models/Address';
import connectToDatabase from '@/lib/mongoose';

export async function GET(req) {
  const userId = req.headers.get('x-user-id');

  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all orders for the given user
    const orders = await Order.find({ user: userId })
      .populate({
        path: 'subOrders.product',
        select: 'name price images', // Populate product details
      })
      .populate('subOrders.seller', 'name') // Populate seller details
      .populate('shippingAddress') // Populate shipping address if needed
      .sort({ createdAt: -1 }); // Sort by latest orders first

    if (!orders.length) {
      return new Response(JSON.stringify({ message: 'No orders found for this user.' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch orders.' }), {
      status: 500,
    });
  }
}
