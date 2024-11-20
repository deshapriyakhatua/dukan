import React from 'react'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_row}>
        <div className={styles.footer_col}>
          <h4 className={styles.footer_col_heading}>Info</h4>
          <ul className={styles.footer_col_list_parent}>
            <li className={styles.footer_col_lists}><a className={styles.footer_col_links} href="#">About Us</a></li>
            <li className={styles.footer_col_lists}><a className={styles.footer_col_links} href="#">Compressions</a></li>
            <li className={styles.footer_col_lists}><a className={styles.footer_col_links} href="#">Customers</a></li>
            <li className={styles.footer_col_lists}><a className={styles.footer_col_links} href="#">Service</a></li>
            <li className={styles.footer_col_lists}><a className={styles.footer_col_links} href="#">Collection</a></li>
          </ul>
        </div>

        <div className={styles.footer_col}>
          <h4 className={styles.footer_col_heading}>Explore</h4>
          <ul className={styles.footer_col_list_parent}>
            <li className={styles.footer_col_lists}><a className={styles.footer_col_links} href="#">Free Designs</a></li>
            <li className={styles.footer_col_lists}><a className={styles.footer_col_links} href="#">Latest Designs</a></li>
            <li className={styles.footer_col_lists}><a className={styles.footer_col_links} href="#">Themes</a></li>
            <li className={styles.footer_col_lists}><a className={styles.footer_col_links} href="#">Popular Designs</a></li>
            <li className={styles.footer_col_lists}><a className={styles.footer_col_links} href="#">Art Skills</a></li>
            <li className={styles.footer_col_lists}><a className={styles.footer_col_links} href="#">New Uploads</a></li>
          </ul>
        </div>

        <div className={styles.footer_col}>
          <h4 className={styles.footer_col_heading}>Legal</h4>
          <ul className={styles.footer_col_list_parent}>
            <li className={styles.footer_col_lists}><a className={styles.footer_col_links} href="#">Customer Agreement</a></li>
            <li className={styles.footer_col_lists}><a className={styles.footer_col_links} href="#">Privacy Policy</a></li>
            <li className={styles.footer_col_lists}><a className={styles.footer_col_links} href="#">GDPR</a></li>
            <li className={styles.footer_col_lists}><a className={styles.footer_col_links} href="#">Security</a></li>
            <li className={styles.footer_col_lists}><a className={styles.footer_col_links} href="#">Testimonials</a></li>
            <li className={styles.footer_col_lists}><a className={styles.footer_col_links} href="#">Media Kit</a></li>
          </ul>
        </div>

        <div className={styles.footer_col}>
          <h4 className={styles.footer_col_heading}>Newsletter</h4>
          <p>
            Subscribe to our newsletter for a weekly dose
            of news, updates, helpful tips, and
            exclusive offers.
          </p>
          <form action="#">
            <input type="text" placeholder="Your email" required/>
            <button type="submit">SUBSCRIBE</button>
          </form>
          <div className={styles.icons}>
            {/* <i className={styles.fa-brands fa-facebook-f}></i>
            <i className={styles.fa-brands fa-twitter}></i>
            <i className={styles.fa-brands fa-linkedin}></i>
            <i className={styles.fa-brands fa-github}></i> */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer