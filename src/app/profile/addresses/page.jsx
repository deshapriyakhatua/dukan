"use client"

import React, { useState } from 'react'
import styles from './page.module.css';
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from 'react-icons/md';

function page() {

    const indianStates = [
        'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
        'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',
        'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh',
        'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
        'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
        'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ].sort();
    const [fullName, setFullName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [pincode, setPincode] = useState(null);
    const [locality, setLocality] = useState(null);
    const [address, setAddress] = useState(null);
    const [district, setDistrict] = useState(null);
    const [state, setState] = useState('');
    const [country, setCountry] = useState('india');
    const [landmark, setLandmark] = useState(null);
    const [alternatePhone, setAlternatePhone] = useState(null);

    return (
        <div className={styles.mainPage}>
            <div className={styles.mainContainer}>
                <h1 className={styles.mainHeader}>Total addresses: {0}</h1>

                <div className={styles.editAddressCard}>

                    <h2>Edit address</h2>

                    <div className={styles.inputContainer}>
                        <label htmlFor="fullName">First Name</label>
                        <input id='fullName' placeholder='Full Name' onChange={(event) => { setFullName(event.target.value) }} />
                    </div>

                    <div className={styles.inputsContainer}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="locality">Locality</label>
                            <input id='locality' placeholder='Locality' onChange={(event) => { setLocality(event.target.value) }} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="pincode">Pincode</label>
                            <input id='pincode' placeholder='Pincode' onChange={(event) => { setPincode(event.target.value) }} />
                        </div>
                    </div>

                    <div className={styles.inputsContainer}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="address">Address (Area & Street)</label>
                            <textarea name="address" id='address' placeholder='Area, Street, Apartment, suite, etc.' onChange={(event) => { setAddress(event.target.value) }}></textarea>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="landmark">Landmark</label>
                            <input id='landmark' placeholder='Landmark (Optional)' onChange={(event) => { setLandmark(event.target.value) }} />
                        </div>
                    </div>

                    <div className={styles.inputsContainer}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="city">City/District/Town</label>
                            <input id='city' placeholder='City' onChange={(event) => { setDistrict(event.target.value) }} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="state">State</label>
                            <select
                                id="state"
                                value={state}
                                onChange={(event) => setState(event.target.value)}
                            >
                                <option value="" disabled>Select</option>
                                {indianStates.map((state, index) => (
                                    <option key={index} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="country">Country</label>
                            <input id='country' placeholder='Country' value={'India'} disabled />
                        </div>
                    </div>

                    <div className={styles.inputsContainer}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="phone">Phone</label>
                            <input id='phone' placeholder='Phone' onChange={(event) => { setPhone(event.target.value) }} />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="altphone">Alternate Phone (optional)</label>
                            <input id='altphone' placeholder='Alternate Phone (optional)' onChange={(event) => { setAlternatePhone(event.target.value) }} />
                        </div>
                    </div>

                    <div className={styles.editAddressCardEventContainer}>
                                <button>Cancel</button>
                                <button>Save</button>
                    </div>

                </div>

                <div className={styles.addressCardsHolder}>
                    <div className={styles.addressCard}>
                        <p>Name Title</p>
                        <p>9876543210</p>
                        <p>123456789</p>
                        <p>C/O Ramchandra Khatua, Vill + Post : Menkapur, Dantan, Paschim Medinipur, West Bengal - 721435</p>
                        <div className={styles.cardEvents}>
                            <div>Edit <FiEdit2 className={styles.cardEventsIcon} /></div>
                            <div>Delete <MdOutlineDeleteOutline className={styles.cardEventsIcon} /></div>
                        </div>
                    </div>
                    <div className={styles.addressCard}>
                        <p>Name Title</p>
                        <p>9876543210</p>
                        <p>123456789</p>
                        <p>C/O Ramchandra Khatua, Vill + Post : Menkapur, Dantan, Paschim Medinipur, West Bengal - 721435</p>
                        <div className={styles.cardEvents}>
                            <div>Edit <FiEdit2 className={styles.cardEventsIcon} /></div>
                            <div>Delete <MdOutlineDeleteOutline className={styles.cardEventsIcon} /></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default page