import React from 'react'
import styles from './MainContent.module.css'

function MainContent() {
    return (
        <section className={styles.mainContainer}>
            <div className={styles.container}>
                <h1 className={styles.mainHeading}>Shipping & Delivery Policy</h1>
                <div className={styles.content}>

                    <p>At Look, we provide <strong>FREE</strong> Standard delivery to any address within Global. However, do note that we do not deliver to PO Boxes, military and restricted areas, all naval ports andJurongIsland.</p>

                    <p>On the front, we deliver to most countries that our logistics partners have affiliates in and whilst we strive to keep our rates affordable, our focus is on getting the items to you quickly, promptly and safely. For a list of countries that we deliver to and our charges, you may select your item and proceed to the check out page as charges are based on weight &amp; volume. Upon entering your delivery details, we will auto calculate the delivery charges based on your given address without the need for payment or registration.</p>

                    <h3>2. ORDER STATUS &amp; TRACKING</h3>

                    <p>All orders placed from Monday to Friday (excluding public holidays) will be processed and shipped within 2 working days upon confirmation of payment, from our warehouse. This could vary with circumstances such as online security checks, shipping restrictions, payment authorization, packing and dispatching of order. An email confirmation will be sent for all orders once received.</p>

                    <p><span style={{textDecoration: "underline", fontWeight: "bold", color: "#404040"}}>Local Deliveries</span></p>

                    <p>There are 2 delivery options available for customer, Standard and Express courier.</p>

                    <p><strong><em>Standard Courier </em></strong>– is FREE for all local orders and it takes approximately 5 working days to reach you from the time of order.</p>

                    <p><strong><em>Express Courier</em></strong> – is available at an additional charge of $4.00 and it takes approximately 3 working days to reach you from the time of order.</p>

                    <p>To serve you better, you may even choose the timing of your deliveries from 9am to 10pm, weekdays or Saturdays, regardless of Standard or Express couriers.</p>

                    <p>Once the order has been dispatched, an email confirmation will be sent to you with the tracking number. You may check and track the delivery status of your orders with our local logistics partner, with your 6-digit Order Number. There will be an additional charge for re-delivery should nobody be present to receive the package. Please provide your contact number under the address selected upon checkout in order for the courier company to contact you in case of any unforeseen circumstances.</p>

                    <p><span style={{textDecoration: "underline", fontWeight: "bold", color: "#404040"}}>International Deliveries</span></p>

                    <p>For all international deliveries, the time taken is dependent on our logistics partners and their affiliates. However, rest assured that your order is safely on its way and may track its status <strong><span style={{textDecoration: "underline"}}>here</span></strong>.</p>

                    <h3>3. TAXES, DUTIES &amp; TARIFFS</h3>

                    <p>For all international orders, you will need to pay for all import taxes, duties and tariffs (if any) as per your country’s governing laws in order to clear customs.</p>

                    <h3>4. MODE OF PAYMENTS</h3>

                    <p>We accept payments via VISA/MASTER credit and debit cards, American Express and PayPal. Please visit <a href="http://www.paypal.com/">www.paypal.com</a> for more information. We do not accept payments via ATM or inter-bank transfers.</p>

                </div>
            </div>
        </section>
    )
}

export default MainContent