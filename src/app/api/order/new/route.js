import connectToDatabase from '@/lib/mongoose';
import Order from '@/lib/models/Order';
import Cart from '@/lib/models/Cart';
import Address from '@/lib/models/Address';
import Product from '@/lib/models/Product';

export async function POST(req) {
  try {
    await connectToDatabase(); // Ensure DB connection

    const userId = req.headers.get('x-user-id');
    const { address, paymentMethod } = await req.json();

    // Step 1: Save address to the Address schema
    const newAddress = await Address.create({
      ...address, // Spread address fields: fullName, phone, pincode, etc.
      user: userId,
    });

    // Step 2: Retrieve user's cart
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return new Response(JSON.stringify({ error: 'Cart is empty' }), {
        status: 400,
      });
    }

    // Step 3: Build `subOrders` and calculate the total price
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

    // Step 4: Create a new order
    const newOrder = await Order.create({
      user: userId,
      subOrders,
      totalPrice,
      shippingAddress: newAddress._id, // Save address ID
      paymentMethod,
    });

    // Step 5: Clear the user's cart
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
