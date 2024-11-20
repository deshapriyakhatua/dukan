import React from 'react'
import styles from './GridBanners.module.css'

function GridBanners() {

    const posts = [
        {
            imgSrc: 'https://landing-page-backend.s3.ap-south-1.amazonaws.com/blog_page_prodimages/ebdb26ae-1b16-4cb1-b809-5bf3e6da06e5/shutterstock_1262641225-1_xl.png',
            title: '12 Photos Of A Gorgeously Designed NYC Home'
        },
        {
            imgSrc: 'https://s9p4a7f6.rocketcdn.me/wp-content/uploads/2022/11/20.-Indian-Lehangas-1-1.jpg',
            title: 'Beautiful Yet Simple Warehouse-Inspired Home'
        },
        {
            imgSrc: 'https://wedbook.in/wp-content/uploads/2021/01/1.-Riya-Jain-820x1024.jpg',
            title: 'Top trends this winter 2016'
        },
        {
            imgSrc: 'https://mc.webpcache.epapr.in/mcms.php?size=large&in=https://mcmscache.epapr.in/post_images/website_13/post_11458194/thumb.jpg',
            title: 'Best 100 memorable sports photos'
        },
        {
            imgSrc: 'https://pbs.twimg.com/media/DIohjQXV4AAgfd4.jpg',
            title: 'Long shadow is dead. Welcome Diffuse shadows.'
        },
        {
            imgSrc: 'https://cdn.augrav.com/online/jewels/2016/02/Ritu-Arya-Razzle-Dazzle-Pickle-blog.jpg',
            title: '12 Photos Of A Gorgeously Designed NYC Home'
        },
        {
            imgSrc: 'https://images.bewakoof.com/web/latest-fashion-trends-bewakoof-blog-1-1621402702.jpg',
            title: 'Christina Schneiderlin: Interview with the artist'
        },
        {
            imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYRhXZRumlzAR7ptBgmGAO1Z1ghszwDopbTFx9mmWfH2yQV5TQPLhNgpzyW5jXDnuLf8w&usqp=CAU',
            title: 'Christina Schneiderlin: Interview with the artist'
        },
        {
            imgSrc: 'https://www.maharaniwomen.com/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-13-at-15.28.51_99a4cbf0.jpg',
            title: 'Christina Schneiderlin: Interview with the artist'
        },
        {
            imgSrc: 'https://cdn.kamatharjun.com/wp-content/uploads/2021/08/Indian-Wedding-Photography-30.jpeg',
            title: 'Christina Schneiderlin: Interview with the artist'
        },
    ]
    return (
        <section className={styles.mainContainer}>
            <div className={styles.headingContainer}>
                <h1>Recent Blog Posts</h1>
                <p>Read Our Recent Blogs. Stay Updated with trends</p>
            </div>
            <div className={styles.grid}>

                {posts && posts.map((elem, indx) => (
                    <div className={styles.card} key={indx}>
                        <img src={elem.imgSrc} alt="img" />
                        <div className={styles.info_center}>{elem.title}</div>
                    </div>
                ))}

            </div>
        </section>
    )
}

export default GridBanners