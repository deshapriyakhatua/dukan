"use client";

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { VscStarHalf } from 'react-icons/vsc';
import { PiHeartFill, PiHeartStraightLight } from 'react-icons/pi';
import { IoIosArrowDown } from 'react-icons/io';
import { useRouter, useSearchParams } from 'next/navigation';

const fetchProducts = async function (category, subCategory, page, limit) {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/public/products/?category=${category}&sub-category=${subCategory}&page=${page}&limit=${limit}`, {
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

function Products() {

    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const subCategory = searchParams.get('sub-category');
    const [products, setProducts] = useState(null);
    const router = useRouter();
    const [isFilterOptionsVisible, setIsFilterOptionsVisible] = useState(false);
    const [isSortOptionsVisible, setIsSortOptionsVisible] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await fetchProducts(category, subCategory, 1, 20);
            setProducts(response.data)
        }
        fetchData();
    }, [])

    const productImages = [
        { url: 'https://apisap.fabindia.com/medias/20174793-01.jpg?context=bWFzdGVyfGltYWdlc3wxNjMzMDJ8aW1hZ2UvanBlZ3xhREF5TDJnMU1pODFNakl4T1Rnd01UZ3lPVFF3Tmk4eU1ERTNORGM1TTE4d01TNXFjR2N8YmZkMWQ4YWRlMDM3YjMxMTAxYjQ3ZGJlZmUxYjQyNjM4NTgxZmI2MTNhM2ZmOTIzZTdjN2YzYmQ1MDc1N2EyMA', alt: '' },
        { url: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/23433406/2023/5/26/aa7221d4-4c83-4044-b44c-3fee51379a661685117567804RARERABBITMenBrownSlimFitOpaqueCasualShirt3.jpg', alt: '' },
        { url: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/28219632/2024/3/12/2f53aaab-40e1-4c5b-8148-6ad150e5f4341710256687634CampusSutraMenClassicOpaqueCheckedCasualShirt2.jpg', alt: '' },
        { url: 'https://apisap.fabindia.com/medias/20174793-03.jpg?context=bWFzdGVyfGltYWdlc3wxNTk1Nzh8aW1hZ2UvanBlZ3xhRE16TDJoaU5TODFNakl4T1Rnd01qWTBPRFl3Tmk4eU1ERTNORGM1TTE4d015NXFjR2N8ZGI1YzdlOTkyMzgxYjVmZjAyM2JhNjBkN2Y1ZGZlZTRkOTYzM2JjMDc2MWVkNGVmZmI2ZjQ0NGU3N2E5N2M5OQ', alt: '' },
        { url: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/29058402/2024/4/18/26873ba8-3017-48b1-8537-a03e6c3d8fb61713455556263CampusSutraMenClassicOpaqueStripedCasualShirt1.jpg', alt: '' },
        { url: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/29058402/2024/4/18/a301a70e-6d0b-4e5e-a259-ba7e90577d811713455556167CampusSutraMenClassicOpaqueStripedCasualShirt4.jpg', alt: '' },
        { url: 'https://apisap.fabindia.com/medias/20174793-04.jpg?context=bWFzdGVyfGltYWdlc3wxNDMxNzF8aW1hZ2UvanBlZ3xhRFppTDJoaVppODFNakl4T1Rnd01qazBNelV4T0M4eU1ERTNORGM1TTE4d05DNXFjR2N8NjAyYmJlOTM5ZTAwZDU2MjIxYzg4YzcxNGEzNTI2ZWNiNTYwODQ0ZmMzODNiYjRjYWEyMjJkZjZhMzE5YTlkOA', alt: '' },
        { url: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/23433406/2024/3/28/8b4cd0fd-3fe6-46ce-960e-5e1e96912d9a1711623458987-RARE-RABBIT-Men-Veniziaa-Textured-Slim-Fit-Cotton-Shirt-6871-11.jpg', alt: '' },
        { url: 'https://apisap.fabindia.com/medias/20174793-05.jpg?context=bWFzdGVyfGltYWdlc3wxNzAzMTJ8aW1hZ2UvanBlZ3xhRFE1TDJobE9DODFNakl4T1Rnd016UXdNakkzTUM4eU1ERTNORGM1TTE4d05TNXFjR2N8ODg2ZDI1MmQ4NDdkNjkxZjE0MzNmNjE4MGM5ZmMzMjU1MDM4NGJjYzExZDk3MjVkYWZlYzNmZGQwMjZiMDYzNw', alt: '' },
        { url: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/29058402/2024/4/18/50f4221f-dbc7-4b5a-aeb3-010e82713d0e1713455556140CampusSutraMenClassicOpaqueStripedCasualShirt3.jpg', alt: '' },
        { url: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/23433406/2023/5/26/a7b7c3c3-6d6d-4a8f-bda0-39ae8e7effbc1685117567793RARERABBITMenBrownSlimFitOpaqueCasualShirt5.jpg', alt: '' },
        { url: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/28219632/2024/3/12/9da6c838-2e37-451c-91ee-619d95be9a2b1710256687563CampusSutraMenClassicOpaqueCheckedCasualShirt4.jpg', alt: '' },
        { url: 'https://apisap.fabindia.com/medias/20174793-06.jpg?context=bWFzdGVyfGltYWdlc3wyNzk4MjN8aW1hZ2UvanBlZ3xhRGMwTDJobE1DODFNakl4T1Rnd016WTVOekU0TWk4eU1ERTNORGM1TTE4d05pNXFjR2N8ZjEyNzFmOWE0N2IwZjgwZjcwYmIxMzQ0ZTc5ODBiMzRmNTY3ZWVlZTAwYWQ2NDQyYjk0NTNmZjg0Njg4YjRhMg', alt: '' },
        { url: 'https://apisap.fabindia.com/medias/20174793-07.jpg?context=bWFzdGVyfGltYWdlc3wyMTEyNjZ8aW1hZ2UvanBlZ3xhR1U1TDJnNFlpODFNakl4T1Rnd05EQXlORGcyTWk4eU1ERTNORGM1TTE4d055NXFjR2N8MjM1NTc4ZGZkZjg3ZWU1ZWEyNDkyMTUyNjA4Yjk1NDA0Yjg1NGVmYzFmNTQ3N2E1YjBlN2YwMzg2ZTRjZjhjOA', alt: '' },
        { url: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/23433406/2023/5/26/27cccc52-0252-4d4b-a64a-a37055fd85271685117567835RARERABBITMenBrownSlimFitOpaqueCasualShirt4.jpg', alt: '' },
        { url: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/29058402/2024/4/18/7f059544-1d61-46d1-a7c4-6cbc64df490b1713455556199CampusSutraMenClassicOpaqueStripedCasualShirt2.jpg', alt: '' },
        { url: 'https://apisap.fabindia.com/medias/20174793-02.jpg?context=bWFzdGVyfGltYWdlc3wxMjA4ODJ8aW1hZ2UvanBlZ3xhRFJsTDJoaE55ODFNakl4T1Rnd01qSXlNall5TWk4eU1ERTNORGM1TTE4d01pNXFjR2N8OTBkMmZmNDBiMDJjYjEyMGY5OTFlMGFiNmM0MzJjZmRlMWRiYzMyZDgyZGMyMDlhYjFlOTcyODBkYjkwNzRkMw', alt: '' },
        { url: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/23433406/2023/5/26/91976655-23e8-4ca7-96ed-50be3a156b831685117567844RARERABBITMenBrownSlimFitOpaqueCasualShirt6.jpg', alt: '' },
        { url: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/28219632/2024/3/12/c7a70b3a-e915-4313-a3d3-b632d0121c691710256687658CampusSutraMenClassicOpaqueCheckedCasualShirt3.jpg', alt: '' },
        { url: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/29058402/2024/4/18/ac2e651f-d696-4796-be8b-1421941621391713455556231CampusSutraMenClassicOpaqueStripedCasualShirt5.jpg', alt: '' },
        { url: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/23433406/2023/5/26/6c0305d9-997f-4c68-a001-21fa1a14c5a61685117567855RARERABBITMenBrownSlimFitOpaqueCasualShirt7.jpg', alt: '' },
    ];

    return (
        <section id={styles.products_main_container}>
            <div className={styles.category_uri}>
                <div className={styles.category_uri__items}>
                    <div className={styles.category_uri__item}>Home</div>
                    <div className={styles.category_uri__item}>Clothing</div>
                    <div className={styles.category_uri__item}>T-Shirts</div>
                </div>
            </div>
            <div className={styles.search_bash}>
                <div className={styles.search_bash__items}>
                    {/* <div className={styles.search_bash__item}>Shirts For Men &amp; Women</div> */}
                    {products && (<div className={styles.search_bash__item}>{products.length} items</div>)}
                </div>
            </div>
            <div className={styles.main_product_filter_sort}>
                <div className={styles.filter__options_container}>
                    <div className={styles.filter_button_container}>
                        <div className={styles.filter_button} onClick={() => { setIsFilterOptionsVisible(true); }}></div>
                        <span className={styles.filter_option_pre_text}>Filters</span>
                        <IoIosArrowDown />
                    </div>
                    <div className={styles.filter_options_parent} style={{ visibility: isFilterOptionsVisible ? 'visible' : 'hidden' }}>
                        <div className={styles.close_main_filter} onClick={() => { setIsFilterOptionsVisible(false); }}></div>
                        <div className={styles.main_filter}>

                            <div className={styles.filter_card}>
                                <div className={styles.filter_title_n_search_container}>
                                    <div className={styles.filter__title}>CATEGORIES</div>
                                </div>
                                <div className={styles.filter__item}>
                                    <div className={styles.filter__item__radio}><input type="radio" id={styles.Men} name="category" /><label
                                        htmlFor="Men">Men</label></div>
                                    <div className={styles.filter__item__radio}><input type="radio" id={styles.Women} name="category" /><label
                                        htmlFor="Women">Women</label></div>
                                    <div className={styles.filter__item__radio}><input type="radio" id={styles.Kids} name="category" /><label
                                        htmlFor="Kids">Kids</label></div>
                                    <div className={styles.filter__item__radio}><input type="radio" id={styles.Girls} name="category" /><label
                                        htmlFor="Girls">Girls</label></div>
                                </div>
                            </div>

                            <div className={styles.filter_card}>
                                <div className={styles.filter_title_n_search_container}>
                                    <div className={styles.filter__title}>BRAND</div>
                                </div>
                                <div className={styles.filter__item}>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" id={styles.Nike} value="Nike" /><label
                                        htmlFor="[object Object]">Nike<span className={styles.filter__item__checkbox__count}>
                                            (100)</span></label></div>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" id={styles.Puma} value="Puma" /><label
                                        htmlFor="[object Object]">Puma<span className={styles.filter__item__checkbox__count}>
                                            (100)</span></label></div>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" id={styles.Adidas}
                                        value="Adidas" /><label htmlFor="[object Object]">Adidas<span
                                            className={styles.filter__item__checkbox__count}>
                                            (100)</span></label></div>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" id={styles.LeeCooper}
                                        value="Lee Cooper" /><label htmlFor="[object Object]">Lee Cooper<span
                                            className={styles.filter__item__checkbox__count}>
                                            (100)</span></label></div>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" id={styles.Reebok}
                                        value="Reebok" /><label htmlFor="[object Object]">Reebok<span
                                            className={styles.filter__item__checkbox__count}>
                                            (100)</span></label></div>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" id={styles.Roadster}
                                        value="Roadster" /><label htmlFor="[object Object]">Roadster<span
                                            className={styles.filter__item__checkbox__count}>
                                            (100)</span></label></div>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" id={styles.Arrow}
                                        value="Arrow" /><label htmlFor="[object Object]">Arrow<span
                                            className={styles.filter__item__checkbox__count}>
                                            (100)</span></label></div>
                                    <div className={styles.filter__item__more}><button>+8 more</button></div>
                                </div>
                            </div>

                            <div className={styles.filter_card}>
                                <div className={styles.filter_title_n_search_container}>
                                    <div className={styles.filter__title}>PRICE</div>
                                </div>
                                <div className={styles.filter__item}>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" name="price"
                                        value="500 1000" /><label htmlFor="500 1000">Rs. 500 to Rs.
                                            1000<span className={styles.filter__item__checkbox__count}>
                                                (100)</span></label></div>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" name="price"
                                        value="1000 2000" /><label htmlFor="1000 2000">Rs. 1000 to Rs.
                                            2000<span className={styles.filter__item__checkbox__count}>
                                                (100)</span></label></div>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" name="price"
                                        value="2000 5000" /><label htmlFor="2000 5000">Rs. 2000 to Rs.
                                            5000<span className={styles.filter__item__checkbox__count}>
                                                (100)</span></label></div>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" name="price"
                                        value="5000 10000" /><label htmlFor="5000 10000">Rs. 5000 to Rs.
                                            10000<span className={styles.filter__item__checkbox__count}>
                                                (100)</span></label></div>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" name="price"
                                        value="10000 20000" /><label htmlFor="10000 20000">Rs. 10000 to Rs.
                                            20000<span className={styles.filter__item__checkbox__count}>
                                                (100)</span></label></div>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" name="price"
                                        value="20000 50000" /><label htmlFor="20000 50000">Rs. 20000 to Rs.
                                            50000<span className={styles.filter__item__checkbox__count}>
                                                (100)</span></label></div>
                                    <div className={styles.filter__item__more}><button>+-1 more</button></div>
                                </div>
                            </div>

                            <div className={styles.filter_card}>
                                <div className={styles.filter_title_n_search_container}>
                                    <div className={styles.filter__title}>COLOR</div>
                                </div>
                                <div className={styles.filter__item}>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" id={styles.Black} name="color"
                                        value="Black" /><span
                                            style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'Black', display: 'inline-block', border: '1px solid #eaeaea' }}></span><label
                                                htmlFor="[object Object]">Black<span className={styles.filter__item__checkbox__count}>
                                                (100)</span></label></div>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" id={styles.White} name="color"
                                        value="White" /><span
                                            style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'White', display: 'inline-block', border: '1px solid #eaeaea' }}></span><label
                                                htmlFor="[object Object]">White<span className={styles.filter__item__checkbox__count}>
                                                (100)</span></label></div>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" id={styles.Red} name="color"
                                        value="Red" /><span
                                            style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'red', display: 'inline-block', border: '1px solid #eaeaea' }}></span><label
                                                htmlFor="[object Object]">Red<span className={styles.filter__item__checkbox__count}>
                                                (100)</span></label></div>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" id={styles.Blue} name="color"
                                        value="Blue" /><span
                                            style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'blue', display: 'inline-block', border: '1px solid #eaeaea' }}></span><label
                                                htmlFor="[object Object]">Blue<span className={styles.filter__item__checkbox__count}>
                                                (100)</span></label></div>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" id={styles.Green} name="color"
                                        value="Green" /><span
                                            style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'green', display: 'inline-block', border: '1px solid #eaeaea' }}></span><label
                                                htmlFor="[object Object]">Green<span className={styles.filter__item__checkbox__count}>
                                                (100)</span></label></div>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" id={styles.Yellow} name="color"
                                        value="Yellow" /><span
                                            style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'yellow', display: 'inline-block', border: '1px solid #eaeaea' }}></span><label
                                                htmlFor="[object Object]">Yellow<span className={styles.filter__item__checkbox__count}>
                                                (100)</span></label></div>
                                    <div className={styles.filter__item__checkbox}><input type="checkbox" id={styles.Pink} name="color"
                                        value="Pink" /><span
                                            style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'pink', display: 'inline-block', border: '1px solid #eaeaea' }}></span><label
                                                htmlFor="[object Object]">Pink<span className={styles.filter__item__checkbox__count}>
                                                (100)</span></label></div>
                                    <div className={styles.filter__item__more}><button>+3 more</button></div>
                                </div>
                            </div>

                            <div className={styles.filter_card}>
                                <div className={styles.filter_title_n_search_container}>
                                    <div className={styles.filter__title}>DISCOUNT</div>
                                </div>
                                <div className={styles.filter__item}>
                                    <div className={styles.filter__item__radio}><input type="radio" name="discount" /><label
                                        htmlFor="10%">10% and above</label></div>
                                    <div className={styles.filter__item__radio}><input type="radio" name="discount" /><label
                                        htmlFor="20%">20% and above</label></div>
                                    <div className={styles.filter__item__radio}><input type="radio" name="discount" /><label
                                        htmlFor="30%">30% and above</label></div>
                                    <div className={styles.filter__item__radio}><input type="radio" name="discount" /><label
                                        htmlFor="40%">40% and above</label></div>
                                    <div className={styles.filter__item__radio}><input type="radio" name="discount" /><label
                                        htmlFor="50%">50% and above</label></div>
                                    <div className={styles.filter__item__radio}><input type="radio" name="discount" /><label
                                        htmlFor="60%">60% and above</label></div>
                                    <div className={styles.filter__item__radio}><input type="radio" name="discount" /><label
                                        htmlFor="70%">70% and above</label></div>
                                    <div className={styles.filter__item__more}><button>+2 more</button></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={styles.sort__options_container}>
                    <div className={styles.sort_button_container}>
                        <div className={styles.sort_button} onClick={() => { setIsSortOptionsVisible(true); }}></div>
                        <span id={styles.selected_option_text}>Sort</span>
                        <span id={styles.selected_option_pre_text}>Sort By :</span>
                        <span id={styles.selected_option}> Recommended </span>
                        <IoIosArrowDown />
                    </div>
                    <div className={styles.sort_options_parent} style={{ visibility: isSortOptionsVisible ? 'visible' : 'hidden' }}>
                        <div className={styles.close_main_sort} onClick={() => { setIsSortOptionsVisible(false); }}></div>
                        <div className={styles.main_sort}>
                            <span>Recommended</span>
                            <span>What's New</span>
                            <span>Popularity</span>
                            <span>Better Discount</span>
                            <span>Price: High to Low</span>
                            <span>Price: Low to High</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.main_products_parent}>
                <div className={styles.main_product}>
                    {products && products.map((product, indx) => (
                        <div className={styles.product__card} onClick={() => { router.push(`/product/${product?._id}`) }} key={indx}>
                            <div className={styles.product__image}>
                                <img src={product?.images[0]} alt="Men Pack Of 2 Sustainable Shirts" className={styles.product_main_img} />
                                <div className={styles.product__rating}>
                                    <span className={styles.rating__number}>4.5</span>
                                    <VscStarHalf size={10} />
                                    <span className={styles.rating__seperator}>|</span>
                                    <span className={styles.rating__count}>18.5K</span>
                                </div>
                                <div className={styles.product__similar}><span className={styles.similar__text}>View Similar</span></div>
                            </div>
                            <div className={styles.product__details}>
                                <div className={styles.product__name}><span>Men Pack Of 2 Sustainable Shirts</span></div>
                                <div className={styles.product__type}><span>Roadster</span></div>
                                <div className={styles.product__price}>
                                    <span className={styles.product__price__actual}>Rs.1799</span>
                                    <span className={styles.product__discount}>Rs.2999</span>
                                    <span className={styles.product__discount__percent}>40% off</span>
                                </div>
                                <div className={styles.product__wishlist__stock}>
                                    <div className={styles.product__stock}><span className={styles.stock__text}>Only Few Left</span></div>
                                    <div className={styles.product__wishlist}>
                                        <PiHeartStraightLight size={25} color='#888' className={styles.addToWishlist} />
                                        {/* <PiHeartFill size={25} color='#888' className={styles.addToWishlist}/> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    )}
                </div>
            </div>
        </section>
    )
}

export default Products