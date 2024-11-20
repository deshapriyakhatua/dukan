"use client";

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { PiHandbagLight, PiHeartStraightLight } from 'react-icons/pi'
import { FaOpencart } from 'react-icons/fa';
import { IoStarHalfOutline } from 'react-icons/io5';
import { RiCloseLargeFill } from 'react-icons/ri';

function Product() { 

    const productImages = [
        { url: 'https://apisap.fabindia.com/medias/20174793-01.jpg?context=bWFzdGVyfGltYWdlc3wxNjMzMDJ8aW1hZ2UvanBlZ3xhREF5TDJnMU1pODFNakl4T1Rnd01UZ3lPVFF3Tmk4eU1ERTNORGM1TTE4d01TNXFjR2N8YmZkMWQ4YWRlMDM3YjMxMTAxYjQ3ZGJlZmUxYjQyNjM4NTgxZmI2MTNhM2ZmOTIzZTdjN2YzYmQ1MDc1N2EyMA', alt: '' },
        { url: 'https://apisap.fabindia.com/medias/20174793-02.jpg?context=bWFzdGVyfGltYWdlc3wxMjA4ODJ8aW1hZ2UvanBlZ3xhRFJsTDJoaE55ODFNakl4T1Rnd01qSXlNall5TWk4eU1ERTNORGM1TTE4d01pNXFjR2N8OTBkMmZmNDBiMDJjYjEyMGY5OTFlMGFiNmM0MzJjZmRlMWRiYzMyZDgyZGMyMDlhYjFlOTcyODBkYjkwNzRkMw', alt: '' },
        { url: 'https://apisap.fabindia.com/medias/20174793-03.jpg?context=bWFzdGVyfGltYWdlc3wxNTk1Nzh8aW1hZ2UvanBlZ3xhRE16TDJoaU5TODFNakl4T1Rnd01qWTBPRFl3Tmk4eU1ERTNORGM1TTE4d015NXFjR2N8ZGI1YzdlOTkyMzgxYjVmZjAyM2JhNjBkN2Y1ZGZlZTRkOTYzM2JjMDc2MWVkNGVmZmI2ZjQ0NGU3N2E5N2M5OQ', alt: '' },
        { url: 'https://apisap.fabindia.com/medias/20174793-04.jpg?context=bWFzdGVyfGltYWdlc3wxNDMxNzF8aW1hZ2UvanBlZ3xhRFppTDJoaVppODFNakl4T1Rnd01qazBNelV4T0M4eU1ERTNORGM1TTE4d05DNXFjR2N8NjAyYmJlOTM5ZTAwZDU2MjIxYzg4YzcxNGEzNTI2ZWNiNTYwODQ0ZmMzODNiYjRjYWEyMjJkZjZhMzE5YTlkOA', alt: '' },
        { url: 'https://apisap.fabindia.com/medias/20174793-05.jpg?context=bWFzdGVyfGltYWdlc3wxNzAzMTJ8aW1hZ2UvanBlZ3xhRFE1TDJobE9DODFNakl4T1Rnd016UXdNakkzTUM4eU1ERTNORGM1TTE4d05TNXFjR2N8ODg2ZDI1MmQ4NDdkNjkxZjE0MzNmNjE4MGM5ZmMzMjU1MDM4NGJjYzExZDk3MjVkYWZlYzNmZGQwMjZiMDYzNw', alt: '' },
        { url: 'https://apisap.fabindia.com/medias/20174793-06.jpg?context=bWFzdGVyfGltYWdlc3wyNzk4MjN8aW1hZ2UvanBlZ3xhRGMwTDJobE1DODFNakl4T1Rnd016WTVOekU0TWk4eU1ERTNORGM1TTE4d05pNXFjR2N8ZjEyNzFmOWE0N2IwZjgwZjcwYmIxMzQ0ZTc5ODBiMzRmNTY3ZWVlZTAwYWQ2NDQyYjk0NTNmZjg0Njg4YjRhMg', alt: '' },
        { url: 'https://apisap.fabindia.com/medias/20174793-07.jpg?context=bWFzdGVyfGltYWdlc3wyMTEyNjZ8aW1hZ2UvanBlZ3xhR1U1TDJnNFlpODFNakl4T1Rnd05EQXlORGcyTWk4eU1ERTNORGM1TTE4d055NXFjR2N8MjM1NTc4ZGZkZjg3ZWU1ZWEyNDkyMTUyNjA4Yjk1NDA0Yjg1NGVmYzFmNTQ3N2E1YjBlN2YwMzg2ZTRjZjhjOA', alt: '' },
        { url: 'https://apisap.fabindia.com/medias/Hand-Block-Print.jpg?context=bWFzdGVyfGltYWdlc3wxNzY4NzZ8aW1hZ2UvanBlZ3xhR0k0TDJneU5pOHhNak14T1RVMk5EQXdOVFF3Tmk5SVlXNWtMVUpzYjJOckxWQnlhVzUwTG1wd1p3fDQ5ZGIyODgxZmIwNDM1N2MyMDE5NjNhNzBhMWNkNjQwOTY3ZjU5ZWJkNDUzZjFlYTE3MDI0OGQ4ZjNkODViOTY', alt: '' },
    ];
    const [selectedImage, setSelectedImage] = useState(productImages[0].url);
    const [isLargeImageVisible, setIsLargeImageVisible] = useState(false);

    // Zoom function for image showcase
    const zoom = (e) => {
        const zoomer = e.currentTarget;
        const offsetX = e.nativeEvent.offsetX || e.touches?.[0]?.pageX || 0;
        const offsetY = e.nativeEvent.offsetY || e.touches?.[0]?.pageY || 0;
        const x = (offsetX / zoomer.offsetWidth) * 100;
        const y = (offsetY / zoomer.offsetHeight) * 100;
        zoomer.style.backgroundPosition = `${x}% ${y}%`;
    };

    useEffect(() => {
        // Set body styles
        document.body.style.overflow = isLargeImageVisible ? 'hidden' : 'scroll';

        // Cleanup the styles when component unmounts
        return () => {
            document.body.style.overflow = 'scroll';
        };
    }, [isLargeImageVisible]);

    useEffect(() => {
    
        // Scroll to the top of the page when the location changes
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    
      }, [selectedImage]);

    return (
        <div className={styles.card_wrapper}>
            <div className={styles.card}>

                {/* card left  */}
                <div className={styles.product_imgs}>
                    <div className={styles.img_display}>
                        <div
                            className={styles.img_showcase}
                            style={{backgroundImage: `url(${selectedImage})`}}
                            onClick={() => { setIsLargeImageVisible(true) }}
                        >
                            <img className={styles.product_image_large}
                                src={selectedImage}
                                alt="shoe image" />
                        </div>
                        {isLargeImageVisible && (
                            <div className={styles.largeImageContainer}>
                                <div className={styles.largeImageParent}>
                                    <div 
                                    className={styles.zoomedBackground}
                                    style={{backgroundImage: `url('${selectedImage}')`}}
                                    onMouseMove={zoom}
                                    onTouchMove={zoom}
                                    >
                                        <img src={selectedImage} alt="" />
                                    </div>
                                    <div className={styles.largeImageClose} onClick={() => { setIsLargeImageVisible(false); }}><RiCloseLargeFill /></div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={styles.img_select}>
                        <div className={styles.images_slider}>
                            {productImages && productImages.map((elem, indx) => (
                                <div className={styles.img_item} key={indx}>
                                    <img
                                        src={elem.url}
                                        alt={elem.alt}
                                        onClick={() => { setSelectedImage(elem.url) }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/*  card right  */}
                <div className={styles.product_content}>

                    <div className={`${styles.product_title} ${styles.product_content_child}`}>
                        <p className={styles.product_heading}>Men Navy Blue & Maroon Striped Polo Collar T-shirt</p>
                        <p className={styles.product_brand}>Nike</p>
                        <p className={styles.product_rating}>4.7<IoStarHalfOutline />(21)</p>
                        <div className={styles.product_price}>
                            <span className={styles.new_price}>₹249.00</span>
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
                        <p>Purple solid Casual shirt ,has a button-down collar, button placket, 1 patch pocket, long regular
                            sleeves, curved hem</p>
                    </div>

                    <div className={`${styles.purchase_info} ${styles.product_content_child}`}>
                        <button type="button" className={styles.add_to_cart_btn}>
                            Add to Cart <PiHandbagLight size={20} className={styles.add_to_cart_icon} />
                        </button>
                        <button type="button" className={styles.buy_now_btn} >
                            Buy Now<FaOpencart size={20} className={styles.add_to_cart_icon} />
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

            </div>
        </div>
    )
}

export default Product