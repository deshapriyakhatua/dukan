import React from 'react'
import styles from './AboutUsSection1.module.css'
import { FaCheckCircle } from 'react-icons/fa'
import image1 from '../../../assets/images/spring-5.webp'
import image2 from '../../../assets/images/outerwear.webp'

function AboutUsSection1() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <div className={styles.row}>

                    <div className={`${styles.content_column} ${styles.col_lg_6} ${styles.col_md_12} ${styles.col_sm_12} ${styles.order_2}`}>
                        <div className={styles.inner_column}>
                            <div className={styles.sec_title}>
                                <span className={styles.title}>About Company</span>
                                <h2>We are leader in <br />Industrial market Since 2020</h2>
                            </div>
                            <div className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur.
                            </div>
                            <ul className={styles.list_items}>
                                <div>
                                    <FaCheckCircle className={styles.list_icon} />
                                    <li>Lorem Ipsum is simply dummy tex</li>
                                </div>
                                <div>
                                    <FaCheckCircle className={styles.list_icon} />
                                    <li>Consectetur adipisicing elit</li>
                                </div>
                                <div>
                                    <FaCheckCircle className={styles.list_icon} />
                                    <li>Sed do eiusmod tempor incididunt</li>
                                </div>
                            </ul>
                            <div className={styles.btn_box}>
                                <a href="#" className={`${styles.theme_btn} ${styles.btn_style_one}`}>Contact Us</a>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.image_column} ${styles.col_lg_6} ${styles.col_md_12} ${styles.col_sm_12}`}>
                        <div className={`${styles.inner_column} ${styles.wow} ${styles.fadeInLeft}`}>
                            <figure className={styles.image_1}>
                                <a href="#" className={styles.lightbox_image} data-fancybox="images">
                                    <img src={image1} alt="" />
                                </a>
                            </figure>
                            <figure className={styles.image_2}>
                                <a href="#" className={styles.lightbox_image} data-fancybox="images">
                                    <img src={image2} alt="" />
                                </a>
                            </figure>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AboutUsSection1