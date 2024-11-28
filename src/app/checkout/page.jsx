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

const placeOrder = async (orderData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to place the order');
        }

        return res.json();
    } catch (error) {
        console.error(`Error placing order:`, error.message);
        throw new Error('An error occurred while placing the order. Please try again later.');
    }
};

function Checkout() {

    const indianStates = [
        'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
        'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',
        'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh',
        'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
        'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
        'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ].sort();
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
    const [state, setState] = useState('');
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
    
    const handlePlaceOrder = async () => {
        if (!fullName || !phone || !pincode || !locality || !address || !district || !state) {
            alert('Please fill out all required fields');
            return;
        }

        try {
            const orderData = {
                address: {
                    fullName,
                    phone,
                    pincode,
                    locality,
                    address,
                    district,
                    state,
                    country,
                    landmark,
                    alternatePhone,
                },
                paymentMethod: isCashOnDelivery ? 'cash_on_delivery' : 'online',
            };

            const response = await placeOrder(orderData);

            if (response.success) {
                alert('Order placed successfully!');
                setCartItems([]); // Clear cart items in UI
                setTotalPrice(0); // Reset total price
            } else {
                alert('Failed to place order');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while placing the order. Please try again later.');
        }
    };

    return (
        <section className={styles.mainContainer}>

            <div className={styles.container}>

                <div className={styles.firstContainer}>

                    <div className={styles.address}>
                        <h1>Address</h1>
                        <div className={styles.inputContainer}>
                            <label htmlFor="fullName">First Name</label>
                            <input id='fullName' placeholder='Full Name' onChange={(event) => { setFullName(event.target.value) }} />
                        </div>
                        <div className={styles.inputsContainer}>
                            <div className={styles.inputContainer}>
                                <label htmlFor="locality">Locality</label>
                                <input id='locality' placeholder='Locality' onChange={(event) => { setLocality(event.target.value) }} />
                            </div>
                            <div className={styles.inputContainer}>
                                <label htmlFor="pincode">Pincode</label>
                                <input id='pincode' placeholder='Pincode' onChange={(event) => { setPincode(event.target.value) }} />
                            </div>
                        </div>
                        <div className={styles.inputsContainer}>
                            <div className={styles.inputContainer}>
                                <label htmlFor="address">Address (Area & Street)</label>
                                <textarea name="address" id='address' placeholder='Area, Street, Apartment, suite, etc.' onChange={(event) => { setAddress(event.target.value) }}></textarea>
                            </div>
                            <div className={styles.inputContainer}>
                                <label htmlFor="landmark">Landmark</label>
                                <input id='landmark' placeholder='Landmark (Optional)' onChange={(event) => { setLandmark(event.target.value) }} />
                            </div>
                        </div>
                        <div className={styles.inputsContainer}>
                            <div className={styles.inputContainer}>
                                <label htmlFor="city">City/District/Town</label>
                                <input id='city' placeholder='City' onChange={(event) => { setDistrict(event.target.value) }} />
                            </div>
                            <div className={styles.inputContainer}>
                                <label htmlFor="state">State</label>
                                <select
                                    id="state"
                                    value={state}
                                    onChange={(event) => setState(event.target.value)}
                                >
                                    <option value="" disabled>Select</option>
                                    {indianStates.map((state, index) => (
                                        <option key={index} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.inputContainer}>
                                <label htmlFor="country">Country</label>
                                <input id='country' placeholder='Country' value={'India'} disabled />
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
                                <input id='phone' placeholder='Phone' onChange={(event) => { setPhone(event.target.value) }} />
                            </div>
                            <div className={styles.inputContainer}>
                                <label htmlFor="altphone">Alternate Phone (optional)</label>
                                <input id='altphone' placeholder='Alternate Phone (optional)' onChange={(event) => { setAlternatePhone(event.target.value) }} />
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
                        <button onClick={handlePlaceOrder}>Place Order</button>
                    </div>

                </div>

            </div>

        </section>
    )
}

export default Checkout