import Order from "@/models/Order";
import Product from "@/models/Product";
import connectToDatabase from "@/lib/mongoose";


export async function GET(req, { params }) {
    const { id } = params;

    try {
        // Connect to the database
        await connectToDatabase();

        // Fetch the order by ID
        const order = await Order.findById(id)
            .populate('products.product', 'name price images'); // Populate product details

        if (!order) {
            return new Response(JSON.stringify({ message: 'Order not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(order), { status: 200 });
    } catch (error) {
        console.error('Error fetching order details:', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch order details' }), { status: 500 });
    }
}
