import Product from "@/models/Product";
import connectToDatabase from "@/lib/mongoose";

export async function GET(request) {

    try {

      await connectToDatabase();
  
      const url = new URL(request.url);
      const category = url.searchParams.get('category');
      const subCategory = url.searchParams.get('sub-category');
      const page = parseInt(url.searchParams.get('page')) || 1;
      const limit = parseInt(url.searchParams.get('limit')) || 10;
  
      // Build the filter
      const filter = {};
      if (category) filter.category = category;
      if (subCategory) filter.subCategory = subCategory;
  
      // Calculate pagination values
      const skip = (page - 1) * limit;
  
      // Fetch products with filters, pagination, and sorting
      const products = await Product.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }); // Sorting by newest first
  
      // Count total matching documents for pagination meta
      const total = await Product.countDocuments(filter);
  
      return new Response(
        JSON.stringify({
          success: true,
          data: products,
          meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );

    } catch (error) {

      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
      
    }

  }