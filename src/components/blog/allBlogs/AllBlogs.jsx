import React, { useEffect, useRef } from 'react'
import { FaCalendarAlt, FaCommentAlt } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import {
    mainContainer,
    blogsContainer,
    newsCard,
    imgSection,
    tagSection,
    tagDate,
    tagMonth,
    otherInfoSection,
    headingSection,
    paginationContainer,
    pagination,
} from './AllBlogs.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useIntersectionObserver2 from '../../../hooks/useIntersectionObserver2';


function AllBlogs() {

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [isScreenLoading, setIsScreenLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8); // Define how many posts to show per page
    const [totalPages, setTotalPages] = useState(1); // Total number of pages

    const fetchPosts = async (page, limit) => {

        try {

            setIsScreenLoading(true);

            const response = await fetch(`https://globaltrans.in/backend/get-posts.php?page=${page}&limit=${limit}`, {
                headers: {
                }
            });

            if (!response.ok) {
                const errRes = await response.json();
                throw new Error(errRes.message);
            }

            const data = await response.json();
            setPosts(data);
            setTotalPages(Math.ceil(data.totalCount / limit)); // Calculate total pages

        } catch (error) {
            console.error('Fetch error:', error.message);
        } finally {
            setIsScreenLoading(false);
        }

    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    useEffect(() => {
        fetchPosts(currentPage, postsPerPage);
    }, [currentPage]);

    return (
        <div className={mainContainer}>
            {
                isScreenLoading
                    ? (<p style={{ textAlign: 'center' }}>Loading...</p>)
                    : (
                        <div className={blogsContainer}>
                            {
                                posts && posts?.posts?.length === 0
                                    ? (<p style={{ textAlign: 'center' }}> No posts available</p>)
                                    : posts?.posts?.map((elem, i) => {

                                        const jsTime = elem?.time + 'z';
                                        const localDate = new Date(jsTime);

                                        // Extract the day and month-year based on the local time
                                        const date = localDate.getDate(); // Local date
                                        const options = { month: 'short', year: 'numeric' };
                                        const monthYear = localDate.toLocaleDateString('en-US', options);

                                        return (
                                            <NewsCard
                                                image={`https://globaltrans.in/backend/${elem?.imageurl}`}
                                                date={date}
                                                monthYear={monthYear}
                                                heading={elem?.title}
                                                key={elem?.id}
                                                onClick={() => {
                                                    navigate(`/blogs/blog/${elem?.id}`)
                                                }}
                                            />
                                        )
                                    })
                            }
                        </div>
                    )
            }

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

        </div>
    )
}

function NewsCard({ image, heading, date, monthYear, onClick }) {

    const divRef = useRef();
    const [loaded, setLoaded] = useState(false);

    useIntersectionObserver2(divRef, () => {
        if (!loaded) {
            setLoaded(true); // Load only once
        }
    });

    return (

        <div className={newsCard} onClick={onClick} ref={divRef}>
            <div className={imgSection}>
                <img src={loaded ?image :''} alt="blog image" />
            </div>
            <div className={tagSection}>
                <p className={tagDate}>{date}</p>
                <p className={tagMonth}>{monthYear}</p>
            </div>
            <div className={otherInfoSection}>
                <div ><BiSolidLike /> {0} Likes</div>
                <div > <FaCommentAlt /> {0} Comments</div>
                <div > <FaShare /> {0} Share</div>
            </div>
            <hr />
            <h1 className={headingSection}>{heading}</h1>
        </div>
    );
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    const pageNumbers = [];

    // Calculate the start and end page numbers based on the current page
    const startPage = Math.max(1, currentPage - 2); // Minimum start page is 1
    const endPage = Math.min(totalPages, currentPage + 2); // Max end page is totalPages

    // Generate the page numbers within the range
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={paginationContainer}>
            <ul className={pagination}>
                {/* Render the 'First' button */}
                {currentPage > 3 && (
                    <li>
                        <button onClick={() => onPageChange(1)}>First</button>
                    </li>
                )}

                {/* Render previous page button if not on the first page */}
                {currentPage > 1 && (
                    <li>
                        <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
                    </li>
                )}

                {/* Render the page numbers */}
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            onClick={() => onPageChange(number)}
                            disabled={number === currentPage}
                        >
                            {number}
                        </button>
                    </li>
                ))}

                {/* Render next page button if not on the last page */}
                {currentPage < totalPages && (
                    <li>
                        <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
                    </li>
                )}

                {/* Render the 'Last' button */}
                {currentPage < totalPages - 2 && (
                    <li>
                        <button onClick={() => onPageChange(totalPages)}>Last</button>
                    </li>
                )}
            </ul>
        </div>
    );
};


export default AllBlogs