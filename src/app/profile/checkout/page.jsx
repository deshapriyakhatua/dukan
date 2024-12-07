"use client";

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { toast } from 'sonner';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { DEFAULT_SIGN_IN } from '@/lib/route';
import Loading from '@/app/loading';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FiEdit2 } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';

const getCartItems = async function () {
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

const getAddresses = async () => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customer/address`);

        if (!res.ok) {
            // Extract and throw server-provided error message if available
            const errorData = await res.json();
            console.log(errorData)
            throw new Error(errorData.error || 'Failed to fetch addresses');
        }

        return await res.json();
    } catch (error) {
        console.error(`Error fetching addresses:`, error.message);
        throw new Error(error.message);
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
    const [addresses, setAddresses] = useState(null);
    const [selectedAddressesId, setSelectedAddressesId] = useState(null);
    const [isAddressFormVisible, setIsAddressFormVisible] = useState(false);
    const [isCashOnDelivery, setIsCashOnDelivery] = useState(true);
    const [cartItems, setCartItems] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const [shippingChrg, setShippingChrg] = useState(null);
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [pincode, setPincode] = useState('');
    const [locality, setLocality] = useState('');
    const [address, setAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('india');
    const [landmark, setLandmark] = useState('');
    const [alternatePhone, setAlternatePhone] = useState('');
    const router = useRouter();
    const { data: session, status, update } = useSession();

    useEffect(() => {

        async function fetchCart() {
            try {
                const data = await getCartItems();
                console.log(data);
                setCartItems(data?.items || []);
                setTotalPrice(data?.items?.reduce((ac, elem) => ac + (elem.product.price * elem.quantity), 0));
                setShippingChrg(0);
            } catch (error) {
                console.log(error)
            }
        }

        async function fetchAddresses() {
            try {
                const data = await getAddresses();
                console.log(data);
                setAddresses(data);
                if (data.length === 0) { setIsAddressFormVisible(true); }
            } catch (error) {
                console.log(error)
            }
        }

        if (status === 'authenticated') {
            fetchCart();
            fetchAddresses();
        }

    }, [status])

    const handlePlaceOrder = async () => {
        if (!isAddressFormVisible) {
            if (!selectedAddressesId) {
                toast.warning('Select one address first!');
                return;
            }
        } else {
            if (fullName.length <= 3) {
                toast.warning('Full name must contain atleast 4 letters');
                return;
            }
            if (phone.length !== 10 || !/^\d+$/.test(phone)) {
                toast.warning("Phone number must be 10 digits.");
                return;
            }
            if (alternatePhone.length !== 10 || !/^\d+$/.test(alternatePhone)) {
                toast.warning("Alternate phone number must be 10 digits.");
                return;
            }
            if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
                toast.warning("Pincode must be 6 digits.");
                return;
            }
            if (locality.length <= 3) {
                toast.warning('Locality must contain atleast 4 letters');
                return;
            }
            if (address.length <= 3) {
                toast.warning('Address must contain atleast 4 letters');
                return;
            }
            if (district.length <= 2) {
                toast.warning('City/District/Town must contain atleast 3 letters');
                return;
            }
            if (landmark.length <= 2) {
                toast.warning('Landmark must contain atleast 3 letters');
                return;
            }

        }

        try {
            const orderData = {
                isNewAddress: isAddressFormVisible,

                address: isAddressFormVisible ?{
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
                } : {addressId: selectedAddressesId},
                paymentMethod: isCashOnDelivery ? 'cash_on_delivery' : 'online',
            };

            const response = await placeOrder(orderData);

            if (response.success) {
                toast.success('Order placed successfully!')
                router.push('/profile/orders');
                setCartItems([]); // Clear cart items in UI
                setTotalPrice(0); // Reset total price
            } else {
                toast.error('Failed to place order')
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while placing the order. Please try again later.', {
                position: 'top-right',
            })
        }
    };

    if (status === 'loading') return <Loading />;
    if (status === 'unauthenticated') redirect(DEFAULT_SIGN_IN);

    if (!cartItems) return <Loading />;

    return (
        <section className={styles.mainContainer}>

            {(cartItems && cartItems.length > 0)
                && (

                    <div className={styles.container}>

                        <div className={styles.firstContainer}>

                            {!isAddressFormVisible ? (
                                <div className={styles.addressesContainer}>

                                    <button
                                        className={styles.addNewAddressButton}
                                        onClick={() => {
                                            setIsAddressFormVisible(true);
                                            setSelectedAddressesId(null);
                                        }}
                                    >
                                        Add new address <FaPlus />
                                    </button>
                                    <h3>Address</h3>
                                    <div className={styles.addressCardsHolder}>
                                        {addresses && addresses.map((elem, indx) => (
                                            <div className={styles.addressCard} key={indx}>
                                                <p>{elem?.fullName}</p>
                                                <p>{elem?.phone}</p>
                                                <p>{elem?.alternatePhone}</p>
                                                <p>{elem?.address}, {elem?.locality}, {elem?.district}, {elem?.state} - {elem?.pincode}</p>
                                                <p>{elem?.country}</p>
                                                <div className={styles.cardEvents}>
                                                    <input type="checkbox"
                                                        checked={selectedAddressesId === elem?._id}
                                                        onChange={() => setSelectedAddressesId(elem?._id)}
                                                    />
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.addressForm}>
                                    <button
                                        className={styles.selectFromSavedButton}
                                        onClick={() => {
                                            if (addresses.length > 0) {
                                                setIsAddressFormVisible(false);
                                            } else {
                                                toast.warning('No address available!')
                                            }
                                        }}
                                    >
                                        Select from Saved Addresses
                                    </button>

                                    <div className={styles.address}>
                                        <h1>New address</h1>
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
                                </div>
                            )}

                            <div className={styles.payment}>
                                <h1>Payment</h1>
                                <div className={styles.checkboxContainer}>
                                    <input
                                        id={styles.cashOnDelivery}
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
                                <button onClick={handlePlaceOrder} disabled={!isCashOnDelivery} className={(!isCashOnDelivery) ? styles.disabled : ''}>Place Order</button>
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