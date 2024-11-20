import React, { useEffect, useRef, useState } from 'react'
import { FaCalendarAlt, FaCommentAlt } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import '../../../assets/css/quill.snow.css'
import {
    mainContainer,
    postContainer,
    mainPost,
    imgSection,
    tagSection,
    tagDate,
    tagMonth,
    headingSection,
    otherInfoSection,
    postContent,
    icon,
    sharePost, tag, gap, shareTitle, iconDiv, shareIcon,
    commentsView, commentView, commentDetails, profileIconView, profileIcon,
} from './BlogSinglePost.module.css'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs"
import { IoMdPricetag } from "react-icons/io"
import { MdOutlineModeComment } from "react-icons/md";
import { useLocation, useParams } from 'react-router-dom';
import useIntersectionObserver2 from '../../../hooks/useIntersectionObserver2';


function BlogSinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [date, setDate] = useState('');
    const [monthYear, setMonthYear] = useState('');
    const [isScreenLoading, setIsScreenLoading] = useState(true);

    const comments = [
        {
            name: 'Govinda Raj',
            date: '12 Aug, 24',
            comment: 'Sed maximus imperdiet ipsum, id scelerisque nisi tincidunt vitae. In lobortis neque nec dolor vehicula, eget vulputate ligula lobortis.'
        },
        {
            name: 'Neha Kheda',
            date: '19 Aug, 24',
            comment: '18 Vivamus gravida felis et nibh tristique viverra. Sed vel tortor id ex accumsan lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        },
        {
            name: 'Basant Rituraj',
            date: '04 Aug, 24',
            comment: 'Maximus imperdiet ipsum, id scelerisque nisi tincidunt vitae. In lobortis neque nec dolor vehicula, eget vulputate ligula lobortis.'
        },
    ];

    const fetchPost = async () => {

        try {

            setIsScreenLoading(true);

            const response = await fetch(`https://globaltrans.in/backend/get-single-post.php?id=${id}`, {
                headers: {
                }
            });

            if (!response.ok) {
                const errRes = await response.json();
                throw new Error(errRes.message);
            }

            const data = await response.json();
            setPost(data);// Calculate total pages

        } catch (error) {
            console.error('Fetch error:', error.message);
        } finally {
            setIsScreenLoading(false);
        }

    }

    const incrementPostViews = async (id) => {

        const response = await fetch(`https://globaltrans.in/backend/increment-post-views.php`,
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                method: "POST",
                body: JSON.stringify({
                    id
                }),
            }
        );

        if (!response.ok) {
            const errRes = await response.json();
            console.log(errRes);
        }

    }

    useEffect(() => {

        if (!post || !post.time) return;
        const jsTime = post?.time + 'z';
        const localDate = new Date(jsTime);

        // Extract the day and month-year based on the local time
        setDate(localDate.getDate()); // Local date
        const options = { month: 'short', year: 'numeric' };
        setMonthYear(localDate.toLocaleDateString('en-US', options));

    }, [post])

    useEffect(() => {

        fetchPost();
        incrementPostViews(id);

    }, [id]);

    return (
        <div className={mainContainer}>

            {
                isScreenLoading
                    ? (<p style={{ textAlign: 'center' }}>Loading...</p>)
                    : (
                        <div className={postContainer} >

                            

                            <MainPost
                                image={`https://globaltrans.in/backend/${post?.imageurl}`}
                                heading={post?.title}
                                date={date}
                                monthYear={monthYear}
                                content={post?.content}
                            />

                            <SharePost
                                url={window.location.href}
                                title={post?.title}
                            />

                            <Comments content={comments} />

                        </div>
                    )
            }

        </div>
    )

}

function MainPost({ image, heading, date, monthYear, content }) {

    const divRef = useRef();
    const [loaded, setLoaded] = useState(false);

    useIntersectionObserver2(divRef, () => {
        if (!loaded) {
            setLoaded(true); // Load only once
        }
    });

    return (
        <div className={mainPost} >
            <div className={imgSection}>
                <img ref={divRef} src={loaded ? image : ''} alt={heading} />
            </div>
            <div className={tagSection}>
                <p className={tagDate}>{date}</p>
                <p className={tagMonth}>{monthYear}</p>
            </div>
            <div className={otherInfoSection}>
                <div ><BiSolidLike className={icon} /> {0} Likes</div>
                <div > <FaCommentAlt className={icon} /> {0} Comments</div>
                <div > <FaShare className={icon} /> {0} Share</div>
            </div>
            <h1 className={headingSection}>{heading}</h1>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: content }} className={`${postContent} ql-editor`} ></div>
        </div>
    )
}

function SharePost({ url, title }) {
    const handleFbShare = () => {
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`;
        window.open(facebookShareUrl, '_blank');
    };

    const handleXShare = ({ url, title }) => {
        const xShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        window.open(xShareUrl, '_blank');
    };

    return (
        <div className={sharePost}>
            <p className={tag}><IoMdPricetag />Relocation</p>
            <p className={tag}><IoMdPricetag />Transports</p>
            <div className={gap}></div>
            <p className={shareTitle}>Share this post</p>
            <div onClick={handleFbShare} className={iconDiv}> <FaFacebook className={shareIcon} /> </div>
            <div onClick={handleXShare} className={iconDiv}> <BsTwitterX className={shareIcon} /> </div>
        </div>
    )
}

function Comments({ content }) {

    return (
        <div className={commentsView}>
            <h5>Comments :</h5>
            {
                content && content.map(({ name, date, comment }, indx) => (
                    <div key={indx} className={commentView}>
                        <div className={profileIconView}> <MdOutlineModeComment className={profileIcon} /> </div>
                        <div className={commentDetails}>
                            <p>{name}</p>
                            <p>{date}</p>
                            <p>{comment}</p>
                        </div>
                        <p></p>
                    </div>
                ))
            }
        </div>
    )
}


export default BlogSinglePost