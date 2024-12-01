"use client";

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { GiExpand } from "react-icons/gi";
import { GrDeliver } from "react-icons/gr";
import { useRouter } from 'next/navigation';

const fetchOrder = async function () {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            // Extract and throw server-provided error message if available
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch product');
        }

        return res.json();
    } catch (error) {
        console.error(`Error fetching products:`, error.message);
        throw new Error('An error occurred while fetching the product. Please try again later.');
    }
}

function Order() {

    const router = useRouter();
    const [OrderItems, setOrderItems] = useState(null);

    useEffect(() => {

        async function fetchData() {
            const data = await fetchOrder();
            console.log(data);
            setOrderItems(data || []);
        }

        fetchData();

    }, [])

    return (
        <section className={styles.main_cart_section}>
            <div className={styles.main_cart_parent}>
                <div className={styles.card_holder}>
                    {OrderItems && (
                        <h4 className={styles.card_holder_title}>
                            Orders: <span>{OrderItems?.length}</span>
                        </h4>
                    )}

                    {OrderItems && OrderItems?.map((order, indx) => (
                        <div className={styles.card_parent} key={indx}>
                            <div>
                                <p>Time: {new Date(order?.createdAt).toLocaleString()}</p>
                                <p>Number of Products: {order?.subOrders?.length}</p>
                                <p>Total Order Value: {order?.totalPrice}Rs</p>
                                <p>Payment Method: {order.paymentMethod === 'cash_on_delivery' ? 'Cash On Delivery' : 'Online'}</p>
                            </div>
                            {order.subOrders && order.subOrders?.map((product, indx) => (
                                <div className={styles.card} key={indx}>
                                    <div className={styles.card_image_container} >
                                        <img className={styles.card_image}
                                            src={product?.product?.images[0]}
                                            alt="Blue Hoodie" />
                                    </div>
                                    <div className={styles.card_details}>
                                        <div className={styles.card_details_child}>
                                            <h2 className={styles.card_title}>{product?.product?.name}</h2>
                                        </div>
                                        <div className={styles.card_details_child}>
                                            <p>Status: Ready to Ship</p>
                                        </div>
                                        <div className={styles.card_details_child}>
                                            <p><span>Quantity : </span><span>{product.quantity}</span></p>
                                        </div>
                                        <div className={styles.card_details_child}>
                                            <div className={styles.edit_button_parent}>
                                                <button className={styles.remove_button}>
                                                <GiExpand />
                                                    <span className={styles.move_to_wishlist_button_text}> Details</span>
                                                </button>
                                                <button className={styles.move_to_wishlist_button}>
                                                <GrDeliver />
                                                    <span className={styles.move_to_wishlist_button_text}> Track</span>
                                                </button>
                                            </div>
                                            <div className={styles.price_parent}>
                                                <h3>{product?.product.price} Rs.</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    ))
                    }

                </div>
            </div>
        </section>
    )
}

export default Order