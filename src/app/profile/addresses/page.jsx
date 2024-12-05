"use client"

import React, { useEffect, useState } from 'react'
import styles from './page.module.css';
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import Loading from '@/app/loading';
import { redirect } from 'next/navigation';

const getAddresses = async () => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customer/address`);

        if (!res.ok) {
            // Extract and throw server-provided error message if available
            const errorData = await res.json();
            console.log(errorData)
            throw new Error(errorData.error || 'Failed to fetch product');
        }

        return await res.json();
    } catch (error) {
        console.error(`Error fetching products:`, error.message);
        throw new Error(error.message);
    }
}

const deleteAddress = async function (addressId) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customer/address`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ addressId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            throw new Error(errorData.error || 'Failed to delete address');
        }

        return await response.json();

    } catch (error) {
        console.error('Error deleting address:', error);
        throw new Error(error.message);
    }
}

const updateAddress = async function (addressId, updatedData) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customer/address`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ addressId, updatedData }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            throw new Error(errorData.error || 'Failed to update address');
        }

        return await response.json();

    } catch (error) {
        console.error('Error updating address:', error);
        throw new Error(error.message);
    }
}

const addNewAddress = async function (addressId, updatedData) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customer/address`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ addressId, updatedData }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            throw new Error(errorData.error || 'Failed to add new address');
        }

        return await response.json();

    } catch (error) {
        console.error('Error adding new address:', error);
        throw new Error(error.message);
    }
}

function page() {

    const { data: session, status, update } = useSession();
    const [addresses, setAddresses] = useState(null);
    const indianStates = [
        'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
        'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',
        'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh',
        'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
        'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
        'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ].sort();
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [pincode, setPincode] = useState('');
    const [locality, setLocality] = useState('');
    const [address, setAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('india');
    const [landmark, setLandmark] = useState('');
    const [alternatePhone, setAlternatePhone] = useState('');
    const [loadingDeleteButtonId, setLoadingDeleteButtonId] = useState(null);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [isUpdateButtonLoading, setIsUpdateButtonLoading] = useState(false);
    const [isAddNewButtonLoading, setIsAddNewButtonLoading] = useState(false);
    const [addNewAddressCardVisible, setAddNewAddressCardVisible] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    async function fetchData() {
        try {
            const data = await getAddresses();
            console.log(data);
            setAddresses(data);

        } catch (error) {
            setOrderItems([]);
            toast.error(error.message)
        }
    }

    const handleDeleteAddress = async (addressId) => {
        try {
            setLoadingDeleteButtonId(addressId);
            const updatedAddresses = [...addresses].filter((item, indx) => addressId !== item?._id);
            await deleteAddress(addressId);
            setAddresses(updatedAddresses);
            toast.success('Address deleted successfully')
        } catch (error) {
            toast.error('Error deleting address!')
        } finally {
            setLoadingDeleteButtonId(null);
        }
    }

    const handleEditAddress = async (addressId) => {
        try {

            setIsUpdateButtonLoading(true);
            const updatedData = { fullName, phone, pincode, locality, address, district, state, country, landmark, alternatePhone };

            // check if fields modified at all
            let isAddressFildsModified = false;
            for (let elem of addresses) {
                if (elem?._id === addressId) {
                    for (let key in updatedData) {
                        if (updatedData[key] !== elem[key]) {
                            isAddressFildsModified = true;
                            break;
                        }
                    }
                }
            }
            if (!isAddressFildsModified) {
                toast.warning('Please update fields first!');
                return;
            }

            // input fields validation
            if (fullName.length <= 3) {
                toast.warning('Full name must contain atleast 4 letters');
                return;
            }
            if (phone.length !== 10 || !/^\d+$/.test(phone)) {
                toast.warning("Phone number must be 10 digits.");
                return;
            }
            if (alternatePhone.length !== 10 || !/^\d+$/.test(alternatePhone)) {
                toast.warning("Alternate phone number must be 10 digits.");
                return;
            }
            if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
                toast.warning("Pincode must be 6 digits.");
                return;
            }
            if (locality.length <= 3) {
                toast.warning('Locality must contain atleast 4 letters');
                return;
            }
            if (address.length <= 10) {
                toast.warning('Address must contain atleast 10 letters');
                return;
            }
            if (district.length <= 2) {
                toast.warning('City/District/Town must contain atleast 3 letters');
                return;
            }
            if (landmark.length <= 2) {
                toast.warning('Landmark must contain atleast 3 letters');
                return;
            }

            await updateAddress(addressId, updatedData);
            toast.success('Address updated successfullly');
            console.log(updatedData);
            await fetchData();

        } catch (error) {
            console.log(error)
            toast.error('Failed to update address');
        } finally {
            setIsUpdateButtonLoading(false);
            // setEditingAddressId(null);
        }

    }

    const handleAddNewAddress = async (addressId) => {
        try {

            setIsAddNewButtonLoading(true);
            const newAddress = { fullName, phone, pincode, locality, address, district, state, country, landmark, alternatePhone };

            // input fields validation
            if (fullName.length <= 3) {
                toast.warning('Full name must contain atleast 4 letters');
                return;
            }
            if (phone.length !== 10 || !/^\d+$/.test(phone)) {
                toast.warning("Phone number must be 10 digits.");
                return;
            }
            if (alternatePhone.length !== 10 || !/^\d+$/.test(alternatePhone)) {
                toast.warning("Alternate phone number must be 10 digits.");
                return;
            }
            if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
                toast.warning("Pincode must be 6 digits.");
                return;
            }
            if (locality.length <= 3) {
                toast.warning('Locality must contain atleast 4 letters');
                return;
            }
            if (address.length <= 10) {
                toast.warning('Address must contain atleast 10 letters');
                return;
            }
            if (district.length <= 2) {
                toast.warning('City/District/Town must contain atleast 3 letters');
                return;
            }
            if (landmark.length <= 2) {
                toast.warning('Landmark must contain atleast 3 letters');
                return;
            }

            await addNewAddress(newAddress);
            toast.success('Address added successfullly');
            console.log(updatedData);
            await fetchData();

        } catch (error) {
            console.log(error)
            toast.error('Failed to update address');
        } finally {
            setIsAddNewButtonLoading(false);
        }
    }

    useEffect(() => {

        if (status === 'authenticated') fetchData();

    }, [status])

    useEffect(() => {
        if (!editingAddressId) {
            setFullName('');
            setPhone('');
            setPincode('');
            setLocality('');
            setAddress('');
            setDistrict('');
            setState('');
            setLandmark('');
            setAlternatePhone('');
        } else {
            const editingAddress = [...addresses].filter((item) => editingAddressId === item?._id);
            setFullName(editingAddress[0]?.fullName);
            setPhone(editingAddress[0]?.phone);
            setPincode(editingAddress[0]?.pincode);
            setLocality(editingAddress[0]?.locality);
            setAddress(editingAddress[0]?.address);
            setDistrict(editingAddress[0]?.district);
            setState(editingAddress[0]?.state);
            setLandmark(editingAddress[0]?.landmark);
            setAlternatePhone(editingAddress[0]?.alternatePhone);
        }
    }, [editingAddressId])

    if (status === 'loading') return <Loading />;
    if (status === 'unauthenticated') redirect(DEFAULT_SIGN_IN);

    if (!addresses) return <Loading />

    return (
        <div className={styles.mainPage}>
            <div className={styles.mainContainer}>
                <h1 className={styles.mainHeader}>Total addresses: {addresses.length}</h1>

                {!isFormVisible && (
                    <div className={styles.addressCardsHolder}>
                        {addresses && addresses.map((elem, indx) => (
                            <div className={styles.addressCard} key={indx}>
                                <p>{elem?.fullName}</p>
                                <p>{elem?.phone}</p>
                                <p>{elem?.alternatePhone}</p>
                                <p>{elem?.address}, {elem?.locality}, {elem?.district}, {elem?.state} - {elem?.pincode}</p>
                                <p>{elem?.country}</p>
                                <div className={styles.cardEvents}>
                                    <button
                                        onClick={() => {
                                            setEditingAddressId(elem?._id);
                                            setIsFormVisible(true);
                                        }}>
                                        Edit
                                        <FiEdit2 className={styles.cardEventsIcon} />
                                    </button>
                                    <button
                                        onClick={() => { handleDeleteAddress(elem?._id); }}
                                        disabled={loadingDeleteButtonId === elem?._id}
                                    >
                                        {loadingDeleteButtonId === elem?._id ? 'Deleting' : 'Delete'}
                                        <MdOutlineDeleteOutline className={styles.cardEventsIcon} />
                                    </button>
                                </div>
                            </div>

                        ))}
                    </div>
                )}

                {isFormVisible && (
                    <div className={styles.editAddressCard}>

                        <h2>Edit address</h2>

                        <div className={styles.inputContainer}>
                            <label htmlFor="fullName">First Name</label>
                            <input value={fullName} id='fullName' placeholder='Full Name' onChange={(event) => { setFullName(event.target.value) }} />
                        </div>

                        <div className={styles.inputsContainer}>
                            <div className={styles.inputContainer}>
                                <label htmlFor="locality">Locality</label>
                                <input value={locality} id='locality' placeholder='Locality' onChange={(event) => { setLocality(event.target.value) }} />
                            </div>
                            <div className={styles.inputContainer}>
                                <label htmlFor="pincode">Pincode</label>
                                <input value={pincode} id='pincode' placeholder='Pincode' onChange={(event) => { setPincode(event.target.value) }} />
                            </div>
                        </div>

                        <div className={styles.inputsContainer}>
                            <div className={styles.inputContainer}>
                                <label htmlFor="address">Address (Area & Street)</label>
                                <textarea value={address} name="address" id='address' placeholder='Area, Street, Apartment, suite, etc.' onChange={(event) => { setAddress(event.target.value) }}></textarea>
                            </div>
                            <div className={styles.inputContainer}>
                                <label htmlFor="landmark">Landmark</label>
                                <input value={landmark} id='landmark' placeholder='Landmark (Optional)' onChange={(event) => { setLandmark(event.target.value) }} />
                            </div>
                        </div>

                        <div className={styles.inputsContainer}>
                            <div className={styles.inputContainer}>
                                <label htmlFor="city">City/District/Town</label>
                                <input value={district} id='city' placeholder='City' onChange={(event) => { setDistrict(event.target.value) }} />
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
                                <input value={phone} id='phone' placeholder='Phone' onChange={(event) => { setPhone(event.target.value) }} />
                            </div>
                            <div className={styles.inputContainer}>
                                <label htmlFor="altphone">Alternate Phone (optional)</label>
                                <input value={alternatePhone} id='altphone' placeholder='Alternate Phone (optional)' onChange={(event) => { setAlternatePhone(event.target.value) }} />
                            </div>
                        </div>

                        <div className={styles.editAddressCardEventContainer}>
                            <button
                                onClick={() => {
                                    setIsFormVisible(false);
                                    setEditingAddressId(null);
                                    setAddNewAddressCardVisible(false);
                                }}
                            >Cancel</button>
                            {addNewAddressCardVisible ? (
                                <button
                                    onClick={() => { handleAddNewAddress(); }}
                                    disabled={isAddNewButtonLoading}
                                >
                                    {!isUpdateButtonLoading ? 'Save' : 'Saving...'}
                                </button>
                            ) : (
                                <button
                                    onClick={() => { handleEditAddress(editingAddressId); }}
                                    disabled={isUpdateButtonLoading}
                                >
                                    {!isUpdateButtonLoading ? 'Update' : 'Updating...'}
                                </button>
                            )}
                        </div>

                    </div>
                )}

            </div>
        </div>
    )
}

export default page