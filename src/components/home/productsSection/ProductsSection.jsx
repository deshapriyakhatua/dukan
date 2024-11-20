import React from 'react'
import styles from './ProductsSection.module.css'

function ProductsSection() {

    const products = [
        {
            imgSrc: 'https://apisap.fabindia.com/medias/20174793-01.jpg?context=bWFzdGVyfGltYWdlc3wxNjMzMDJ8aW1hZ2UvanBlZ3xhREF5TDJnMU1pODFNakl4T1Rnd01UZ3lPVFF3Tmk4eU1ERTNORGM1TTE4d01TNXFjR2N8YmZkMWQ4YWRlMDM3YjMxMTAxYjQ3ZGJlZmUxYjQyNjM4NTgxZmI2MTNhM2ZmOTIzZTdjN2YzYmQ1MDc1N2EyMA',
            imgSrc1: 'https://apisap.fabindia.com/medias/20174793-03.jpg?context=bWFzdGVyfGltYWdlc3wxNTk1Nzh8aW1hZ2UvanBlZ3xhRE16TDJoaU5TODFNakl4T1Rnd01qWTBPRFl3Tmk4eU1ERTNORGM1TTE4d015NXFjR2N8ZGI1YzdlOTkyMzgxYjVmZjAyM2JhNjBkN2Y1ZGZlZTRkOTYzM2JjMDc2MWVkNGVmZmI2ZjQ0NGU3N2E5N2M5OQ',
            title: 'Men Shirt Poller Bear',
            brand: 'SLOUP',
            price: 500,
            discount: '30%',
        },
        {
            imgSrc: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/28219632/2024/3/12/2f53aaab-40e1-4c5b-8148-6ad150e5f4341710256687634CampusSutraMenClassicOpaqueCheckedCasualShirt2.jpg',
            imgSrc1: 'https://apisap.fabindia.com/medias/20174793-04.jpg?context=bWFzdGVyfGltYWdlc3wxNDMxNzF8aW1hZ2UvanBlZ3xhRFppTDJoaVppODFNakl4T1Rnd01qazBNelV4T0M4eU1ERTNORGM1TTE4d05DNXFjR2N8NjAyYmJlOTM5ZTAwZDU2MjIxYzg4YzcxNGEzNTI2ZWNiNTYwODQ0ZmMzODNiYjRjYWEyMjJkZjZhMzE5YTlkOA',
            title: 'Men Shirt Poller Bear',
            brand: 'SLOUP',
            price: 500,
            discount: '30%',
        },
        {
            imgSrc: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/29058402/2024/4/18/26873ba8-3017-48b1-8537-a03e6c3d8fb61713455556263CampusSutraMenClassicOpaqueStripedCasualShirt1.jpg',
            imgSrc1: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/29058402/2024/4/18/a301a70e-6d0b-4e5e-a259-ba7e90577d811713455556167CampusSutraMenClassicOpaqueStripedCasualShirt4.jpg',
            title: 'Men Shirt Poller Bear',
            brand: 'SLOUP',
            price: 500,
            discount: '30%',
        },
        {
            imgSrc: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/23433406/2024/3/28/8b4cd0fd-3fe6-46ce-960e-5e1e96912d9a1711623458987-RARE-RABBIT-Men-Veniziaa-Textured-Slim-Fit-Cotton-Shirt-6871-11.jpg',
            imgSrc1: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/23433406/2023/5/26/aa7221d4-4c83-4044-b44c-3fee51379a661685117567804RARERABBITMenBrownSlimFitOpaqueCasualShirt3.jpg',
            title: 'Men Shirt Poller Bear',
            brand: 'SLOUP',
            price: 500,
            discount: '30%',
        },
        {
            imgSrc: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/23433406/2023/5/26/6c0305d9-997f-4c68-a001-21fa1a14c5a61685117567855RARERABBITMenBrownSlimFitOpaqueCasualShirt7.jpg',
            imgSrc1: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/29058402/2024/4/18/50f4221f-dbc7-4b5a-aeb3-010e82713d0e1713455556140CampusSutraMenClassicOpaqueStripedCasualShirt3.jpg',
            title: 'Men Shirt Poller Bear',
            brand: 'SLOUP',
            price: 500,
            discount: '30%',
        },
    ];

  return (
    <section className={styles.mainContainer}>
        <div className={styles.detailsContainer}>
            <h1 className={styles.heading}>Trendy Products</h1>
            <p className={styles.desc}>Explore All Trendy Products From Our Store</p>
        </div>
        <div className={styles.productsSection}>
            {products && products.map((elem, indx) => (
                <div className={styles.card} key={indx}>
                    <div className={styles.imageContainer} style={{backgroundImage: `url('${elem.imgSrc1}')`}}>
                        <span className={styles.discount}>{elem.discount}</span>
                        <img src={elem.imgSrc}/>
                    </div>
                    <div className={styles.contentContainer}>
                        <p className={styles.title}>{elem.title}</p>
                        <p className={styles.brand}>{elem.brand}</p>
                        <p className={styles.price}>{elem.price}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default ProductsSection