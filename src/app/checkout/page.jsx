"use client";

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'

const fetchCart = async function () {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`, {
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
        console.error(`Error fetching products:`, error.message);
        throw new Error('An error occurred while fetching the product. Please try again later.');
    }
}

function Checkout() {

    const [isCashOnDelivery, setIsCashOnDelivery] = useState(true);
    const [cartItems, setCartItems] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const [shippingChrg, setShippingChrg] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [pincode, setPincode] = useState(null);
    const [locality, setLocality] = useState(null);
    const [address, setAddress] = useState(null);
    const [district, setDistrict] = useState(null);
    const [state, setState] = useState(null);
    const [country, setCountry] = useState(null);
    const [landmark, setLandmark] = useState(null);
    const [alternatePhone, setAlternatePhone] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchCart();
                console.log(data);
                setCartItems(data?.items || []);
                setTotalPrice(data?.items?.reduce((ac, elem) => ac + (elem.product.price * elem.quantity), 0));
                setShippingChrg(0);
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [])
    const products = [
        {
            imgSrc: 'https://apisap.fabindia.com/medias/20174793-01.jpg?context=bWFzdGVyfGltYWdlc3wxNjMzMDJ8aW1hZ2UvanBlZ3xhREF5TDJnMU1pODFNakl4T1Rnd01UZ3lPVFF3Tmk4eU1ERTNORGM1TTE4d01TNXFjR2N8YmZkMWQ4YWRlMDM3YjMxMTAxYjQ3ZGJlZmUxYjQyNjM4NTgxZmI2MTNhM2ZmOTIzZTdjN2YzYmQ1MDc1N2EyMA',
            title: 'Latest Colored shirt',
            price: 250,
            qnty: 20
        },
        {
            imgSrc: 'https://apisap.fabindia.com/medias/20174793-02.jpg?context=bWFzdGVyfGltYWdlc3wxMjA4ODJ8aW1hZ2UvanBlZ3xhRFJsTDJoaE55ODFNakl4T1Rnd01qSXlNall5TWk4eU1ERTNORGM1TTE4d01pNXFjR2N8OTBkMmZmNDBiMDJjYjEyMGY5OTFlMGFiNmM0MzJjZmRlMWRiYzMyZDgyZGMyMDlhYjFlOTcyODBkYjkwNzRkMw',
            title: 'Latest Colored shirt',
            price: 542,
            qnty: 1
        },
        {
            imgSrc: 'https://apisap.fabindia.com/medias/20174793-03.jpg?context=bWFzdGVyfGltYWdlc3wxNTk1Nzh8aW1hZ2UvanBlZ3xhRE16TDJoaU5TODFNakl4T1Rnd01qWTBPRFl3Tmk4eU1ERTNORGM1TTE4d015NXFjR2N8ZGI1YzdlOTkyMzgxYjVmZjAyM2JhNjBkN2Y1ZGZlZTRkOTYzM2JjMDc2MWVkNGVmZmI2ZjQ0NGU3N2E5N2M5OQ',
            title: 'Latest Colored shirt',
            price: 354,
            qnty: 5
        },
    ];

    return (
        <section className={styles.mainContainer}>

            <div className={styles.container}>

                <div className={styles.firstContainer}>

                    <div className={styles.address}>
                        <h1>Address</h1>
                        <div className={styles.inputContainer}>
                            <label htmlFor="fullName">First Name</label>
                            <input id='fullName' placeholder='Full Name' />
                        </div>
                        <div className={styles.inputsContainer}>
                            <div className={styles.inputContainer}>
                                <label htmlFor="locality">Locality</label>
                                <input id='locality' placeholder='Locality' />
                            </div>
                            <div className={styles.inputContainer}>
                                <label htmlFor="pincode">Pincode</label>
                                <input id='pincode' placeholder='Pincode' />
                            </div>
                        </div>
                        <div className={styles.inputsContainer}>
                            <div className={styles.inputContainer}>
                                <label htmlFor="address">Address (Area & Street)</label>
                                <input id='address' placeholder='Area, Street, Apartment, suite, etc.' />
                            </div>
                            <div className={styles.inputContainer}>
                                <label htmlFor="landmark">Landmark</label>
                                <input id='landmark' placeholder='Landmark' />
                            </div>
                        </div>
                        <div className={styles.inputsContainer}>
                            <div className={styles.inputContainer}>
                                <label htmlFor="city">City/District/Town</label>
                                <input id='city' placeholder='City' />
                            </div>
                            <div className={styles.inputContainer}>
                                <label htmlFor="state">State</label>
                                <input id='state' placeholder='State' />
                            </div>
                            <div className={styles.inputContainer}>
                                <label htmlFor="country">Country</label>
                                <input id='country' placeholder='Country' />
                            </div>
                        </div>
                        <div className={styles.checkboxContainer}>
                            <input id='saveAddress' type='checkbox' defaultChecked />
                            <label htmlFor="saveAddress">Save Address</label>
                        </div>
                    </div>

                    <div className={styles.contact}>
                        <h1>Contact</h1>
                        <div className={styles.inputsContainer}>
                            <div className={styles.inputContainer}>
                                <label htmlFor="phone">Phone</label>
                                <input id='phone' placeholder='Phone' />
                            </div>
                            <div className={styles.inputContainer}>
                                <label htmlFor="altphone">Alternate Phone (optional)</label>
                                <input id='altphone' placeholder='Alternate Phone (optional)' />
                            </div>
                        </div>
                    </div>

                    <div className={styles.payment}>
                        <h1>Payment</h1>
                        <div className={styles.checkboxContainer}>
                            <input
                                id="cashOnDelivery"
                                type="checkbox"
                                checked={isCashOnDelivery}
                                onChange={(e) => {
                                    setIsCashOnDelivery(e.target.checked);
                                }}
                            />
                            <label htmlFor="cashOnDelivery">Cash On Delivery</label>
                        </div>
                        {!isCashOnDelivery && (
                            <button className={styles.payNow}>Pay Now</button>
                        )}
                    </div>

                </div>

                <div className={styles.secondContainer}>

                    <div className={styles.products}>
                        {cartItems && cartItems.map((product, indx) => (
                            <div className={styles.product} key={indx}>
                                <div className={styles.imgContainer}>
                                    <img src={product?.product?.images[0]} alt="" />
                                    <span className={styles.productQnty}>{product?.quantity}</span>
                                </div>
                                <p className={styles.productName}>{product?.product?.name}</p>
                                <p className={styles.productPrice}>{product?.product?.price} Rs</p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.priceContainer}>
                        <div className={styles.subtotal}>
                            <p>Subtotal</p>
                            <p>{totalPrice} Rs</p>
                        </div>
                        <div className={styles.shipping}>
                            <p>Shipping</p>
                            <p>{shippingChrg} Rs</p>
                        </div>
                        <div className={styles.total}>
                            <p>Total</p>
                            <p>{totalPrice + shippingChrg} Rs</p>
                        </div>
                    </div>

                    <div className={styles.placeOrderButton}>
                        <button>Place Order</button>
                    </div>

                </div>

            </div>

        </section>
    )
}

export default Checkout