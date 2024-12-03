'use client';

import React, { useEffect, useState } from 'react'
import styles from './ProductContent.module.css'
import { PiHandbagLight } from 'react-icons/pi'
import { FaOpencart } from 'react-icons/fa';
import { IoStarHalfOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function ProductContent({ product }) {

    const router = useRouter();
    const [productId, setProductId] = useState(product?._id);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');
    const [buyNowLoading, setBuyNowLoading] = useState(false);
    const [addToCartLoading, setAddToCartLoading] = useState(false);

    const handleAddToCart = async (buttonType) => {
        if (buttonType === 'add_to_cart') setAddToCartLoading(true);
        if (buttonType === 'buy_now') setBuyNowLoading(true);
        setMessage(''); // Clear previous messages

        if (!productId || quantity < 1) {
            setMessage('Please fill all fields correctly.');
            return;
        }

        try {
            const response = await fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, quantity }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Product added to cart successfully!');
                if (buttonType === 'buy_now') router.push('/cart');
            } else {
                setMessage(data.error || 'Failed to add product to cart.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.' + error.message);
        } finally {
            if (buttonType === 'add_to_cart') setAddToCartLoading(false);
            if (buttonType === 'buy_now') setBuyNowLoading(false);
        }
    };

    useEffect(() => {
        if (message) {
            toast.success(message, {
                position: 'top-right',
            })
        }
    }, [message])
    return (
        <div className={styles.product_content}>

            <div className={`${styles.product_title} ${styles.product_content_child}`}>
                <p className={styles.product_heading}>{product.name}</p>
                <p className={styles.product_brand}>Nike</p>
                <p className={styles.product_rating}>4.7<IoStarHalfOutline />(21)</p>
                <div className={styles.product_price}>
                    <span className={styles.new_price}>₹{product.price}</span>
                    MRP
                    <span className={styles.mrp_price}>₹588</span>
                    <span className={styles.off_percent}>(35% OFF)</span>
                </div>
            </div>

            <div className={`${styles.delivery_options} ${styles.product_content_child}`}>
                <h4 className={styles.content_child_heading}>Delivery Options</h4>
                <div className={styles.delivery_options_parent}>
                    <div className={styles.delivery_input_parent}>
                        <input type="text" className={styles.pincode_input} placeholder="Enter pincode" maxLength="6" pattern="\d*" />
                        <span className={styles.check_pincode_btn}>Check</span>
                    </div>
                    <p className={styles.delivery_result}>Delivery Available</p>
                </div>
            </div>

            <div className={`${styles.product_offer} ${styles.product_content_child}`}>
                <h4 className={styles.content_child_heading}>Best Offers</h4>
                <div className={styles.product_offer_parent}>
                    <li className={styles.offers}>Applicable on: Orders above Rs. 999 (only on first purchase)</li>
                    <li className={styles.offers}>Coupon code: <b>OFF200</b></li>
                    <li className={styles.offers}>Coupon Discount: Rs. 98 off (check cart for final savings)</li>
                </div>
            </div>

            <div className={`${styles.product_detail} ${styles.product_content_child}`}>
                <h4 className={styles.content_child_heading}>Product Details</h4>
                <p>{product.description}</p>
            </div>

            <div className={`${styles.purchase_info} ${styles.product_content_child}`}>
                <button type="button" className={styles.add_to_cart_btn} onClick={() => { handleAddToCart('add_to_cart'); }} disabled={addToCartLoading}>
                    {!addToCartLoading ? 'Add to Cart' : 'Adding...'} <PiHandbagLight size={20} className={styles.add_to_cart_icon} />
                </button>
                <button type="button" className={styles.buy_now_btn}
                    onClick={() => {
                        handleAddToCart('buy_now');
                    }} 
                    disabled={buyNowLoading}>
                    {!buyNowLoading ? 'Buy Now' : 'Adding...'}<FaOpencart size={20} className={styles.add_to_cart_icon} />
                </button>
            </div>

            <div className={`${styles.product_specifications} ${styles.product_content_child}`}>
                <h4 className={styles.content_child_heading}>Product Specifications</h4>
                <div className={styles.specification_container}>
                    <div className={styles.specification_row}>
                        <div className={styles.specification_row_key}>Sleeve Length</div>
                        <div className={styles.specification_row_value}>Long Sleeves</div>
                    </div>
                    <div className={styles.specification_row}>
                        <div className={styles.specification_row_key}>Collar</div>
                        <div className={styles.specification_row_value}>Button-Down Collar</div>
                    </div>
                    <div className={styles.specification_row}>
                        <div className={styles.specification_row_key}>Fit</div>
                        <div className={styles.specification_row_value}>Slim Fit</div>
                    </div>
                    <div className={styles.specification_row}>
                        <div className={styles.specification_row_key}>Print or Pattern Type</div>
                        <div className={styles.specification_row_value}>Solid</div>
                    </div>
                    <div className={styles.specification_row}>
                        <div className={styles.specification_row_key}>Occasion</div>
                        <div className={styles.specification_row_value}>Casual</div>
                    </div>
                    <div className={styles.specification_row}>
                        <div className={styles.specification_row_key}>Length</div>
                        <div className={styles.specification_row_value}>Regular</div>
                    </div>
                    <div className={styles.specification_row}>
                        <div className={styles.specification_row_key}>Hemline</div>
                        <div className={styles.specification_row_value}>Curved</div>
                    </div>
                    <div className={styles.specification_row}>
                        <div className={styles.specification_row_key}>Placket</div>
                        <div className={styles.specification_row_value}>Button Placket</div>
                    </div>
                </div>
            </div>

            <div className={`${styles.detailed_rating} ${styles.product_content_child}`}>
                <h4 className={styles.content_child_heading}> Ratings </h4>
                <div className={styles.detailed_rating_parent}>
                    <div className={styles.average_rating_parent}>
                        <div className={styles.average_rating}>
                            <span>4.3</span>
                            <IoStarHalfOutline size={25} color='#555' />
                        </div>
                        <div className={styles.average_rating_desc}>
                            4.2k Verified Buyers
                        </div>
                    </div>
                    <div>
                        <div className={styles.rating_bar_container}>
                            <div className={styles.rating_level_parent}>
                                <span className={styles.rating_level}>5</span>
                                <IoStarHalfOutline color='gray' size={12} />
                            </div>
                            <div className={styles.progress_bar_parent}>
                                <div className={styles.progress_bar_child} style={{ width: "74%" }}></div>
                            </div>
                            <div className={styles.rating_level_count}>2584</div>
                        </div>
                        <div className={styles.rating_bar_container}>
                            <div className={styles.rating_level_parent}>
                                <span className={styles.rating_level}>4</span>
                                <IoStarHalfOutline color='gray' size={12} />
                            </div>
                            <div className={styles.progress_bar_parent}>
                                <div className={styles.progress_bar_child} style={{ width: "84%" }}></div>
                            </div>
                            <div className={styles.rating_level_count}>7584</div>
                        </div>
                        <div className={styles.rating_bar_container}>
                            <div className={styles.rating_level_parent}>
                                <span className={styles.rating_level}>3</span>
                                <IoStarHalfOutline color='gray' size={12} />
                            </div>
                            <div className={styles.progress_bar_parent}>
                                <div className={styles.progress_bar_child} style={{ width: "24%" }}></div>
                            </div>
                            <div className={styles.rating_level_count}>584</div>
                        </div>
                        <div className={styles.rating_bar_container}>
                            <div className={styles.rating_level_parent}>
                                <span className={styles.rating_level}>2</span>
                                <IoStarHalfOutline color='gray' size={12} />
                            </div>
                            <div className={styles.progress_bar_parent}>
                                <div className={styles.progress_bar_child} style={{ width: "9%" }}></div>
                            </div>
                            <div className={styles.rating_level_count}>84</div>
                        </div>
                        <div className={styles.rating_bar_container}>
                            <div className={styles.rating_level_parent}>
                                <span className={styles.rating_level}>1</span>
                                <IoStarHalfOutline color='gray' size={12} />
                            </div>
                            <div className={styles.progress_bar_parent}>
                                <div className={styles.progress_bar_child} style={{ width: "14%" }}></div>
                            </div>
                            <div className={styles.rating_level_count}>484</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles.specific_ratings} ${styles.product_content_child}`}>
                <h4 className={styles.content_child_heading}>What Customers Said </h4>
                <div className={styles.specific_ratings_parent}>
                    <div className={styles.specific_ratings_card}>
                        <p>Fit</p>
                        <div className={styles.progress_and_text}>
                            <div className={styles.progress_bar_parent}>
                                <div className={styles.progress_bar_child} style={{ width: "74%" }}></div>
                            </div>
                            <p className={styles.progress_text}> Tight (74%) </p>
                        </div>
                    </div>
                    <div className={styles.specific_ratings_card}>
                        <p>Length</p>
                        <div className={styles.progress_and_text}>
                            <div className={styles.progress_bar_parent}>
                                <div className={styles.progress_bar_child} style={{ width: "66%" }}></div>
                            </div>
                            <p className={styles.progress_text}> A Little Tight (66%) </p>
                        </div>
                    </div>
                    <div className={styles.specific_ratings_card}>
                        <p>Tight</p>
                        <div className={styles.progress_and_text}>
                            <div className={styles.progress_bar_parent}>
                                <div className={styles.progress_bar_child} style={{ width: "80%" }}></div>
                            </div>
                            <p className={styles.progress_text}> A Little Loose (80%) </p>
                        </div>
                    </div>
                    <div className={styles.specific_ratings_card}>
                        <p>Loose</p>
                        <div className={styles.progress_and_text}>
                            <div className={styles.progress_bar_parent}>
                                <div className={styles.progress_bar_child} style={{ width: "56%" }}></div>
                            </div>
                            <p className={styles.progress_text}> Loose (56%) </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductContent