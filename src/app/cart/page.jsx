"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { PiHeartStraightLight } from 'react-icons/pi';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

const fetchCart = async function () {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch product');
        }

        return res.json();
    } catch (error) {
        console.error(`Error fetching products:`, error.message);
        throw new Error('An error occurred while fetching the product. Please try again later.');
    }
};

function Cart() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [shippingChrg, setShippingChrg] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchCart();
            setCartItems(data?.items || []);
            calculateTotalPrice(data?.items || []);
        }

        fetchData();
    }, []);

    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        setTotalPrice(total);
    };

    const handleIncrement = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity += 1;
        setCartItems(updatedCartItems);
        calculateTotalPrice(updatedCartItems);
    };

    const handleDecrement = (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity > 1) {
            updatedCartItems[index].quantity -= 1;
            setCartItems(updatedCartItems);
            calculateTotalPrice(updatedCartItems);
        }
    };

    return (
        <section className={styles.main_cart_section}>
            {cartItems && cartItems.length > 0 && (
                <div className={styles.main_cart_parent}>
                    <div className={styles.card_holder}>
                        <h4 className={styles.card_holder_title}>
                            Items: <span>{cartItems.length}</span>
                        </h4>
                        <div className={styles.card_parent}>
                            {cartItems.map((product, index) => (
                                <div className={styles.card} key={index}>
                                    <div className={styles.card_image_container}>
                                        <img className={styles.card_image}
                                            src={product?.product?.images[0]}
                                            alt={product?.product?.name} />
                                    </div>
                                    <div className={styles.card_details}>
                                        <div className={styles.card_details_child}>
                                            <h2 className={styles.card_title}>{product?.product?.name}</h2>
                                        </div>
                                        <div className={styles.card_details_child}>
                                            <p><span>Color : </span>Blue</p>
                                            <div className={styles.quantity_button_holder}>
                                                <button
                                                    type="button"
                                                    className={styles.btn_quantity_decrease}
                                                    onClick={() => handleDecrement(index)}
                                                >
                                                    −
                                                </button>
                                                <span className={styles.span_quantiry}>{product.quantity}</span>
                                                <button
                                                    type="button"
                                                    className={styles.btn_quantity_increase}
                                                    onClick={() => handleIncrement(index)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className={styles.card_details_child}>
                                            <p><span>Size : </span>M</p>
                                        </div>
                                        <div className={styles.card_details_child}>
                                            <div className={styles.edit_button_parent}>
                                                <button className={styles.remove_button}>
                                                    <AiOutlineDelete />
                                                    <span className={styles.move_to_wishlist_button_text}> Remove</span>
                                                </button>
                                                <button className={styles.move_to_wishlist_button}>
                                                    <PiHeartStraightLight />
                                                    <span className={styles.move_to_wishlist_button_text}> Favourite</span>
                                                </button>
                                            </div>
                                            <div className={styles.price_parent}>
                                                <h3>{product?.product?.price} Rs.</h3>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.checkout_holder}>
                        <div className={styles.checkout_card}>
                            <h3 className={styles.checkout_title}>The total amount of</h3>
                            <div className={styles.checkout_details}>
                                <div className={`${styles.checkout_details_row} ${styles.row1}`}>
                                    <p>Total amount</p>
                                    <p>{totalPrice} Rs</p>
                                </div>
                                <div className={`${styles.checkout_details_row} ${styles.row2}`}>
                                    <p>Shipping</p>
                                    <p>{shippingChrg} Rs</p>
                                </div>
                                <div className={`${styles.checkout_details_row} ${styles.row3}`}>
                                    <p className={styles.p_total_label}>The total amount of (Including GST)</p>
                                    <p className={styles.p_total}>{totalPrice + shippingChrg} Rs</p>
                                </div>
                                <div className={`${styles.checkout_details_row} ${styles.row4}`}>
                                    <button className={styles.checkout_button} onClick={() => router.push('/checkout')}>
                                        Go To Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.discount_code_cart}>
                            <p>Add a discount code (optional)</p>
                            <input type="text" />
                        </div>
                    </div>
                </div>
            )}

            {cartItems && cartItems.length == 0 && (
                <div className={styles.emptyCartContainer}>
                    <div className={styles.imgParent}>
                        <img
                            src="https://static.vecteezy.com/system/resources/thumbnails/005/006/007/small/no-item-in-the-shopping-cart-click-to-go-shopping-now-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
                            alt="Empty Cart"
                        />
                    </div>
                    <h3>Cart is Empty</h3>
                    <p>Add items on the cart before you proceed to checkout</p>
                </div>
            )}
        </section>
    );
}

export default Cart;
