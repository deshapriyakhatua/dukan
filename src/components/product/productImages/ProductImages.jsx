"use client";

import React, { useEffect, useState } from 'react'
import styles from './ProductImages.module.css'
import { RiCloseLargeFill } from 'react-icons/ri';

function ProductImages({images, name}) {

    const productImages = images.map((elem) => { return {url: elem, alt: name}});
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
        <div className={styles.product_imgs}>
            <div className={styles.img_display}>

                <div
                    className={styles.img_showcase}
                    style={{ backgroundImage: `url(${selectedImage})` }}
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
                                style={{ backgroundImage: `url('${selectedImage}')` }}
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
    )
}

export default ProductImages