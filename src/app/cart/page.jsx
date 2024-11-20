"use client";

import React from 'react'
import styles from './page.module.css'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { PiHeartStraightLight } from 'react-icons/pi'
import { AiOutlineDelete } from 'react-icons/ai'
import { useRouter } from 'next/navigation';

function Cart() {

    const router = useRouter();

    return (
        <section className={styles.main_cart_section}>
            <div className={styles.main_cart_parent}>
                <div className={styles.card_holder}>
                    <h4 className={styles.card_holder_title}>Cart (<span>3</span>items)</h4>
                    <div className={styles.card_parent}>
                        <div className={styles.card}>
                            <div className={styles.card_image_container}>
                                <img className={styles.card_image}
                                    src="https://apisap.fabindia.com/medias/20174793-01.jpg?context=bWFzdGVyfGltYWdlc3wxNjMzMDJ8aW1hZ2UvanBlZ3xhREF5TDJnMU1pODFNakl4T1Rnd01UZ3lPVFF3Tmk4eU1ERTNORGM1TTE4d01TNXFjR2N8YmZkMWQ4YWRlMDM3YjMxMTAxYjQ3ZGJlZmUxYjQyNjM4NTgxZmI2MTNhM2ZmOTIzZTdjN2YzYmQ1MDc1N2EyMA"
                                    alt="Blue Hoodie" />
                            </div>
                            <div className={styles.card_details}>
                                <div className={styles.card_details_child}>
                                    <h2 className={styles.card_title}>Modulo color t_Shirt</h2>
                                </div>
                                <div className={styles.card_details_child}>
                                    <p>Hodie_B</p>
                                </div>
                                <div className={styles.card_details_child}>
                                    <p><span>Color : </span><span>Blue</span></p>
                                    <div className={styles.quantity_button_holder}>
                                        <button type="button" className={styles.btn_quantity_decrease}>−</button>
                                        <span className={styles.span_quantiry}>0</span>
                                        <button type="button" className={styles.btn_quantity_increase}>+</button>
                                    </div>
                                </div>
                                <div className={styles.card_details_child}>
                                    <p><span>Size : </span><span>M</span></p>
                                    <p className={styles.pack_note}>(<span> 1 piece</span>)</p>
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
                                        <h3>354 Rs.</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.card_image_container}>
                                <img className={styles.card_image}
                                    src="https://apisap.fabindia.com/medias/20174793-02.jpg?context=bWFzdGVyfGltYWdlc3wxMjA4ODJ8aW1hZ2UvanBlZ3xhRFJsTDJoaE55ODFNakl4T1Rnd01qSXlNall5TWk4eU1ERTNORGM1TTE4d01pNXFjR2N8OTBkMmZmNDBiMDJjYjEyMGY5OTFlMGFiNmM0MzJjZmRlMWRiYzMyZDgyZGMyMDlhYjFlOTcyODBkYjkwNzRkMw"
                                    alt="Blue Hoodie" />
                            </div>
                            <div className={styles.card_details}>
                                <div className={styles.card_details_child}>
                                    <h2 className={styles.card_title}>Jombok t-Shirt printed</h2>
                                </div>
                                <div className={styles.card_details_child}>
                                    <p>Hodie-B</p>
                                </div>
                                <div className={styles.card_details_child}>
                                    <p><span>Color : </span><span>Blue</span></p>
                                    <div className={styles.quantity_button_holder}>
                                        <button type="button" className={styles.btn_quantity_decrease}>−</button>
                                        <span className={styles.span_quantiry}>0</span>
                                        <button type="button" className={styles.btn_quantity_increase}>+</button>
                                    </div>
                                </div>
                                <div className={styles.card_details_child}>
                                    <p><span>Size : </span><span>M</span></p>
                                    <p className={styles.pack_note}>(<span> 1 piece</span>)</p>
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
                                        <h3>974 Rs.</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.card_image_container}>
                                <img className={styles.card_image}
                                    src="https://apisap.fabindia.com/medias/20174793-03.jpg?context=bWFzdGVyfGltYWdlc3wxNTk1Nzh8aW1hZ2UvanBlZ3xhRE16TDJoaU5TODFNakl4T1Rnd01qWTBPRFl3Tmk4eU1ERTNORGM1TTE4d015NXFjR2N8ZGI1YzdlOTkyMzgxYjVmZjAyM2JhNjBkN2Y1ZGZlZTRkOTYzM2JjMDc2MWVkNGVmZmI2ZjQ0NGU3N2E5N2M5OQ"
                                    alt="Blue Hoodie" />
                            </div>
                            <div className={styles.card_details}>
                                <div className={styles.card_details_child}>
                                    <h2 className={styles.card_title}>Printed t-Shirt</h2>
                                </div>
                                <div className={styles.card_details_child}>
                                    <p>Hodie-B</p>
                                </div>
                                <div className={styles.card_details_child}>
                                    <p><span>Color : </span><span>Blue</span></p>
                                    <div className={styles.quantity_button_holder}>
                                        <button type="button" className={styles.btn_quantity_decrease}>−</button>
                                        <span className={styles.span_quantiry}>0</span>
                                        <button type="button" className={styles.btn_quantity_increase}>+</button>
                                    </div>
                                </div>
                                <div className={styles.card_details_child}>
                                    <p><span>Size : </span><span>M</span></p>
                                    <p className={styles.pack_note}>(<span> 1 piece</span>)</p>
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
                                        <h3>704 Rs.</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={styles.checkout_holder}>
                    <div className={styles.checkout_card}>
                        <h3 className={styles.checkout_title}>The total amount of</h3>
                        <div className={styles.checkout_details}>
                            <div className={`${styles.checkout_details_row} ${styles.row1}`}>
                                <p>Temporary amount</p>
                                <p>$0.00</p>
                            </div>
                            <div className={`${styles.checkout_details_row} ${styles.row2}`}>
                                <p>Shipping</p>
                                <p>Gratis</p>
                            </div>
                            <div className={`${styles.checkout_details_row} ${styles.row3}`}>
                                <div className={styles.col_6}>
                                    <p className={styles.p_total_label} >The total amount of (Including GST)</p>
                                </div>
                                <div className={styles.col_6}>
                                    <p className={styles.p_total}>$0.00</p>
                                </div>
                            </div>
                            <div className={`${styles.checkout_details_row} ${styles.row4}`}>
                                <button className={styles.checkout_button} onClick={() => { router.push('/checkout'); }}>Go To Checkout</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.discount_code_cart}>
                        <p>Add a discount code (optional)</p>
                        <input type="text" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cart