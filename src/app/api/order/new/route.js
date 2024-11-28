
import connectToDatabase from '@/lib/mongoose';
import Address from '@/lib/models/Address';
import Order from '@/lib/models/Order';
import Cart from '@/lib/models/Cart';

export async function POST(req) {
  try {
    await connectToDatabase(); // Ensure DB connection

    const userId = req.headers.get('x-user-id');
    const {  address, paymentMethod } = await req.json();

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

    // Calculate total price
    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Step 3: Move products to Order schema
    const newOrder = await Order.create({
      user: userId,
      products: cart.items,
      totalPrice,
      status: 'pending',
      shippingAddress: newAddress._id, // Save address ID
      paymentMethod,
    });

    // Step 4: Clear the user's cart
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
