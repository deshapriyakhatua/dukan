import React from 'react'
import styles from './BannerCards.module.css'


function BannerCards() {

    const contents = [
        { src: '/transparent-bg-shirt1.png', title: 'Mini Bagpack', desc: 'Enjoy 50% off' },
        { src: '/transparent-bg-shirt.png', title: 'Large Bagpack', desc: 'Enjoy 50% off' },
        { src: '/transparent-bg-shirt2.png', title: 'Small Bagpack', desc: 'Enjoy 50% off' },
    ]

    return (
        <section className={styles.mainContainer}>
            <div className={styles.contentContainer}>
                {contents && contents.map((elem, indx) => (
                    <div className={styles.childDiv} key={indx}>
                        <div className={styles.contentParent}>
                            <p className={styles.title}>{elem.title}</p>
                            <p className={styles.desc}>{elem.desc}</p>
                        </div>
                        <div className={styles.imgContainer}>
                            <img src={elem.src} className={styles.img} alt='' />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default BannerCards