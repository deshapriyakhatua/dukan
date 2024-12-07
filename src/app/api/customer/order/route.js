import Product from '@/models/Product';
import User from '@/models/User';
import Order from '@/models/Order';
import Cart from '@/models/Cart';
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

export async function POST(req) {

  try {

    await connectToDatabase(); // Ensure DB connection

    const userId = req.headers.get('x-user-id');
    const { isNewAddress, address, paymentMethod } = await req.json();

    let addressId;
    // if new address provided save address to the Address schema
    if(isNewAddress) {
      const newAddress = await Address.create({
        ...address, // Spread address fields: fullName, phone, pincode, etc.
        user: userId,
      });
      addressId = newAddress._id;
    } else {
      addressId = address?.addressId;
    }

    // Retrieve user's cart
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return new Response(JSON.stringify({ error: 'Cart is empty' }), {
        status: 400,
      });
    }

    // Build `subOrders` and calculate the total price
    const subOrders = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
      seller: item.product.seller,
      status: 'pending', // Default status for new sub-orders
    }));

    const totalPrice = subOrders.reduce(
      (sum, subOrder) => sum + subOrder.price * subOrder.quantity,
      0
    );

    // Create a new order
    const newOrder = await Order.create({
      user: userId,
      subOrders,
      totalPrice,
      shippingAddress: addressId,
      paymentMethod,
    });

    // Clear the user's cart
    await Cart.findOneAndUpdate({ user: userId }, { items: [] });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Order placed successfully',
        order: newOrder,
      }),
      { status: 201 }
    );

  } catch (error) {

    console.error('Error placing order:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
    });

  }
}