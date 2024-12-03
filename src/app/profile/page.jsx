"use client";

import React from 'react'
import styles from './page.module.css'
import { BsBoxFill, BsChevronRight } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { SlLocationPin } from "react-icons/sl";
import { FaCreditCard, FaUserCog } from 'react-icons/fa';
import { MdContactSupport } from 'react-icons/md';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { handleSignOut } from '@/lib/authHelper';

function page() {
    const accountOptions = [
        {}
    ];
    const { data: session } = useSession();
    const isLoggedIn = session?.user;
    const router = useRouter();

    if(!isLoggedIn) { redirect("/auth/signin"); }

    return (
        <div className={styles.mainPage}>
            <div className={styles.mainContainer}>
                <div className={styles.firstSection}>
                    <div className={styles.card} onClick={()=>{ router.push('/orders'); }}>
                        <div className={styles.imgContainer}><BsBoxFill size={35} /></div>
                        <div className={styles.content}>
                            <h3>Your Orders</h3>
                            <p>Track, return or buy things again</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.imgContainer}><FaUserCog size={35} /></div>
                        <div className={styles.content}>
                            <h3>Login & Security</h3>
                            <p>Edit login, name & and mobile no</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.imgContainer}><FaCreditCard size={35} /></div>
                        <div className={styles.content}>
                            <h3>Prime</h3>
                            <p>View benifits and payment settings</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.imgContainer}><MdContactSupport size={35} /></div>
                        <div className={styles.content}>
                            <h3>Your Orders</h3>
                            <p>Track, return or buy things agin</p>
                        </div>
                    </div>
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
                            <div className={styles.cRow}>
                                <SlLocationPin />
                                <p>Saved address</p>
                                <BsChevronRight />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.lastSection}>
                    <button className={styles.logoutButton} 
                     onClick={async () => {
                         const signedOut = await handleSignOut();
                         if(signedOut) router.push('/auth/signin');
                         console.log(signedOut)
                      }}>Log out</button>
                </div>

            </div>
        </div>
    )
}

export default page