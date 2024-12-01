"use client";

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const fetchCart = async function () {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`, {
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
    const [country, setCountry] = useState('india');
    const [landmark, setLandmark] = useState(null);
    const [alternatePhone, setAlternatePhone] = useState(null);
    const router = useRouter();

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
            toast.error('Please fill out all required fields', {
                position: 'top-right',
            })
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
                toast.success('Order placed successfully!', {
                    position: 'top-right',
                })
                router.replace('/orders');
                setCartItems([]); // Clear cart items in UI
                setTotalPrice(0); // Reset total price
            } else {
                toast.error('Failed to place order', {
                    position: 'top-right',
                })
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while placing the order. Please try again later.', {
                position: 'top-right',
            })
        }
    };

    return (
        <section className={styles.mainContainer}>

            {(cartItems && cartItems.length > 0)
                && (

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
                                    <button className={styles.payNow} onClick={() => {
                                        toast.warning('Only Cash On Delivery Option Available', {
                                            position: 'top-right',
                                        })
                                    }}>Pay Now</button>
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
                                <button onClick={handlePlaceOrder} disabled={!isCashOnDelivery} className={!isCashOnDelivery ? styles.disabled : ''}>Place Order</button>
                            </div>

                        </div>

                    </div>
                )
            }

            {(cartItems && cartItems.length == 0)
                && (
                    <div className={styles.emptyCartContainer}>
                        <div className={styles.imgParent}>
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/005/006/007/small/no-item-in-the-shopping-cart-click-to-go-shopping-now-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg" alt="" />
                        </div>
                        <h3>Cart is Empty</h3>
                        <p>Add items on the cart before you proceed to checkout</p>
                    </div>
                )
            }

        </section>
    )
}

export default Checkout