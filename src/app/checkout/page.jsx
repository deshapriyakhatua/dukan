"use client";

import React, { useState } from 'react'
import styles from './page.module.css'

function Checkout() {

    const [isCashOnDelivery, setIsCashOnDelivery] = useState(true);
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
                        <div className={styles.inputsContainer}>
                            <div className={styles.inputContainer}>
                                <label htmlFor="firstName">First Name</label>
                                <input id='firstName' placeholder='First Name' />
                            </div>
                            <div className={styles.inputContainer}>
                                <label htmlFor="lastName">Last Name</label>
                                <input id='lastName' placeholder='Last Name' />
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="address">Address</label>
                            <input id='address' placeholder='Address' />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="additional">Additional Details</label>
                            <input id='additional' placeholder='Apartment, suite, etc. (optional)' />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="pincode">Pincode</label>
                            <input id='pincode' placeholder='Pincode' />
                        </div>
                        <div className={styles.inputsContainer}>
                            <div className={styles.inputContainer}>
                                <label htmlFor="city">City</label>
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
                            <input id='saveAddress' type='checkbox' defaultChecked/>
                            <label htmlFor="saveAddress">Save Address</label>
                        </div>
                    </div>

                    <div className={styles.contact}>
                        <h1>Contact</h1>
                        <div className={styles.inputContainer}>
                            <label htmlFor="phone">Phone</label>
                            <input id='phone' placeholder='Phone' />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="email">Email</label>
                            <input id='email' placeholder='Email' />
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
                        {products && products.map((elem, indx) => (
                            <div className={styles.product} key={indx}>
                                <div className={styles.imgContainer}>
                                    <img src={elem.imgSrc} alt="" />
                                    <span className={styles.productQnty}>{elem.qnty}</span>
                                </div>
                                <p className={styles.productName}>{elem.title}</p>
                                <p className={styles.productPrice}>{elem.price} Rs</p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.priceContainer}>
                        <div className={styles.subtotal}>
                            <p>Subtotal</p>
                            <p>255 Rs</p>
                        </div>
                        <div className={styles.shipping}>
                            <p>Shipping</p>
                            <p>55 Rs</p>
                        </div>
                        <div className={styles.total}>
                            <p>Total</p>
                            <p>310 Rs</p>
                        </div>
                    </div>

                </div>

            </div>

        </section>
    )
}

export default Checkout