import styles from './page.module.css'
import ProductImages from '@/components/product/productImages/ProductImages';
import ProductContent from '@/components/product/productContent/ProductContent';

async function fetchProduct(id) {
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/product/${id}`, {
            next: { revalidate: 3 }, // Revalidate after 1 hour
            cache: 'force-cache', // Use cached data
        });

        if (!res.ok) {
            // Extract and throw server-provided error message if available
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch product');
        }

        return res.json();
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error.message);
        throw new Error('An error occurred while fetching the product. Please try again later.');
    }
}

export async function generateMetadata({ params }) {

    const { id } = await params;

    try {
        const product = await fetchProduct(id); // Fetch the product data
        return {
            title: `${product.name} - Product`,
            description: product.description || "Read this amazing blog product!",
            keywords: product.keywords || [product.category, product.subCategory, "product", product.title],
        };
    } catch (error) {
        console.error(`Error generating metadata:`, error.message);
        return {
            title: "Error - Product",
            description: "An error occurred while loading the blog product.",
            keywords: ["error", "product"],
        };
    }
}

async function Product({ params }) {

    const { id } = await params;

    try {
        // Attempt to fetch the blog post data
        const product = await fetchProduct(id);

        return (
            <div className={styles.card_wrapper}>
                <div className={styles.card}>

                    {/* card left  */}
                    <ProductImages 
                        images={product?.images}
                        name={product?.name}
                    />

                    {/*  card right  */}
                    <ProductContent
                        product={product}
                    />

                </div>
            </div>
        )
    } catch (error) {
        // Render fallback UI with a helpful error message
        return (
            <div className={styles.errorContainer}>
                <h1>Oops! Something went wrong.</h1>
                <p>We couldn't load the requested product at this time.</p>
                <p>Error: {error.message}</p>
                <p>Please try again later or contact support if the problem persists.</p>
            </div>
        );
    }
}

export default Product