"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './CarouselTextImage.module.css';

function CarouselTextImage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselItemsRef = useRef([]);

    const slides = [
        {
            title: 'Looking For Best Price',
            subtitle: 'New Fashion',
            desc: 'Summer Collections Up To 70% Off The Entrire Store! Made With Love',
            imgSrc: 'https://ethnicartsofindia.com/cdn/shop/files/11_1.jpg?v=1715773884&width=2048'
        },
        {
            title: 'Autumn Winter Collections',
            subtitle: 'New Fashion',
            desc: 'Summer Collections Up To 70% Off The Entrire Store! Made With Love',
            imgSrc: 'https://blueparrotstudio.in/wp-content/uploads/2021/01/b1d04282200537.5d15f3c281af8-1024x682.jpg'
        },
        {
            title: 'Spring Summer Collection',
            subtitle: 'New Fashion',
            desc: 'Summer Collections Up To 70% Off The Entrire Store! Made With Love',
            imgSrc: 'https://indiantextilejournal.com/wp-content/uploads/Indian-Terrain-Sweatshirt-1.jpg'
        },
        {
            title: 'Spring Summer Collection',
            subtitle: 'New Fashion',
            desc: 'Summer Collections Up To 70% Off The Entrire Store! Made With Love',
            imgSrc: 'https://dhunkifashion.com/wp-content/uploads/2020/05/history-of-indian-ethnic-wear-1.jpg'
        },
        {
            title: 'Spring Summer Collection',
            subtitle: 'New Fashion',
            desc: 'Summer Collections Up To 70% Off The Entrire Store! Made With Love',
            imgSrc: 'https://www.noblehousecreations.net/wp-content/uploads/2020/09/bridal-lehnga.jpg'
        },
        {
            title: 'Autumn Winter Collections',
            subtitle: 'New Fashion',
            desc: 'Summer Collections Up To 70% Off The Entrire Store! Made With Love',
            imgSrc: 'https://scontent.fccu31-2.fna.fbcdn.net/v/t39.30808-6/437485193_10160871435620399_2779281639270164576_n.jpg?stp=dst-jpg_s960x960&_nc_cat=103&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=O14wd0LGxdMQ7kNvgFJTcHF&_nc_zt=23&_nc_ht=scontent.fccu31-2.fna&_nc_gid=AkaUkJEQjN1p8ZadaijoCNo&oh=00_AYAFGG6RRWgWKrFchjhiLdW8c_n5fc-cc9N9bjAWEeRuEg&oe=6725539C'
        },
        {
            title: 'Spring Summer Collection',
            subtitle: 'New Fashion',
            desc: 'Summer Collections Up To 70% Off The Entrire Store! Made With Love',
            imgSrc: 'https://t3.ftcdn.net/jpg/08/31/95/10/360_F_831951050_8uoXdDzKx5bGxw29psVPlGVWLAQpYEjp.jpg'
        },
    ]
    const totalSlides = slides.length; 

    const handleNext = () => {
        setCurrentSlide((prevSlide) => {
            const nextSlide = (prevSlide + 1) % totalSlides;
            setSlide(prevSlide, nextSlide);
            return nextSlide;
        });
    };

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => {
            const prev = (prevSlide - 1 + totalSlides) % totalSlides;
            setSlide(prevSlide, prev);
            return prev;
        });
    };

    const setSlide = (prev, next) => {
        if (carouselItemsRef.current[prev]) {
            carouselItemsRef.current[prev].classList.remove(styles.active);
        }
        if (carouselItemsRef.current[next]) {
            carouselItemsRef.current[next].classList.add(styles.active);
        }
    };

    useEffect(() => {
        if (carouselItemsRef.current[0]) {
            carouselItemsRef.current[0].classList.add(styles.active);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(handleNext, 5000);
        return () => clearInterval(interval);
    }, [])

    return (
        <section className={styles.mainContainer}>
            <div className={styles.carousel}>
                <div className={styles.carousel__nav}>
                    <span onClick={handlePrev} className={styles.carousel__arrow}>
                        <svg className={styles.carousel__icon} width="24" height="24" viewBox="0 0 24 24">
                            <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
                        </svg>
                    </span>
                    <span onClick={handleNext} className={styles.carousel__arrow}>
                        <svg className={styles.carousel__icon} width="24" height="24" viewBox="0 0 24 24">
                            <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                        </svg>
                    </span>
                </div>
                
                {/* Map through carousel items and add refs */}
                {slides && slides.map((elem, index) => (
                    <div
                        key={index}
                        ref={(el) => (carouselItemsRef.current[index] = el)}
                        className={`${styles.carousel_item}`}
                    >
                        <div className={styles.carousel_item__info}>
                            <div className={styles.carousel_item__container}>
                                <h2 className={styles.carousel_item__subtitle}>{elem.subtitle}</h2>
                                <h1 className={styles.carousel_item__title}>{elem.title}</h1>
                                <p className={styles.carousel_item__description}>
                                    {elem.desc}
                                </p>
                                <a href="#" className={styles.carousel_item__btn}>Explore</a>
                            </div>
                        </div>
                        <div className={styles.carousel_item__image} style={{backgroundImage: `url('${elem.imgSrc}')`}}></div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CarouselTextImage;
