"use client";

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { BsBoxFill, BsChevronRight } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { SlLocationPin } from "react-icons/sl";
import { FaCreditCard, FaUserCog } from 'react-icons/fa';
import { MdContactSupport } from 'react-icons/md';
import { redirect, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'sonner';
import Loading from '../loading';
import Link from 'next/link';

function page() {

    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [isSignOutLoading, setIsSignOutLoading] = useState(false);
    const handleSignOut = async () => {
        try {
            setIsSignOutLoading(true);
            await signOut();
            toast.success('Signed out Successfully')
            await update();
            setIsSignOutLoading(false);
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    if (status === 'loading') return <Loading />;
    if (status === 'unauthenticated') redirect("/auth/signin");

    return (
        <div className={styles.mainPage}>
            <div className={styles.mainContainer}>
                <div className={styles.firstSection}>
                    <Link className={styles.card} href='/profile/orders'>
                        <div className={styles.imgContainer}><BsBoxFill size={35} /></div>
                        <div className={styles.content}>
                            <h3>Your Orders</h3>
                            <p>Track, return or buy things again</p>
                        </div>
                    </Link>
                    <Link className={styles.card} href='/profile'>
                        <div className={styles.imgContainer}><FaUserCog size={35} /></div>
                        <div className={styles.content}>
                            <h3>Login & Security</h3>
                            <p>Edit login, name & and mobile no</p>
                        </div>
                    </Link>
                    <Link className={styles.card} href='/cart'>
                        <div className={styles.imgContainer}><FaCreditCard size={35} /></div>
                        <div className={styles.content}>
                            <h3>Cart</h3>
                            <p>View cart and checkout</p>
                        </div>
                    </Link>
                    <Link className={styles.card} href="/profil/addresses">
                        <div className={styles.imgContainer}><MdContactSupport size={35} /></div>
                        <div className={styles.content}>
                            <h3>Saved Addresses</h3>
                            <p>Add, Edit and delete addresses</p>
                        </div>
                    </Link>
                </div>
                <div className={styles.secondSection}>
                    <div className={styles.othersCard}>
                        <h4>Account Settings</h4>
                        <div>
                            <div className={styles.cRow}>
                                <AiOutlineUser />
                                <p>Edit profile</p>
                                <BsChevronRight />
                            </div>
                            <Link href="/profile/addresses" className={styles.cRow}>
                                <SlLocationPin />
                                <p>Saved address</p>
                                <BsChevronRight />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={styles.lastSection}>
                    <button className={styles.logoutButton}
                        onClick={handleSignOut}>
                        {!isSignOutLoading ? 'Sign out' : 'Signing out...'}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default page