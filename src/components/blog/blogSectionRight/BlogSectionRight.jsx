import React, { useEffect, useRef, useState } from 'react'
import {
  mainSection,
  categoriesDiv,
  categories,
  recentPostDiv,
  recentPost,
  imgContainer,
  recentPostRight,
  tagsView,
  tagTop,
  tagBottom,
  tag,
} from './BlogSectionRight.module.css'
import { IoMdPricetag } from "react-icons/io"
import { useNavigate } from 'react-router-dom';
import useIntersectionObserver2 from '../../../hooks/useIntersectionObserver2';


function BlogSectionRight() {

  const navigate = useNavigate();
  const [recentPosts, setRecentPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [isScreenLoading1, setIsScreenLoading1] = useState(true);
  const [isScreenLoading2, setIsScreenLoading2] = useState(true);

  async function getRecentPosts() {
    try {
      setIsScreenLoading1(true);
      const response = await fetch('https://globaltrans.in/backend/get-recent-posts.php', {
        headers: {
        }
      });

      if (!response.ok) {
        const errRes = await response.json();
        throw new Error(errRes.message);
      }

      const fetchedData = await response.json();
      setRecentPosts(fetchedData);

    } catch (error) {
      console.error('Fetch error:', error.message);
    } finally {
      setIsScreenLoading1(false);
    }

  }

  async function getPopularPosts() {

    try {

      setIsScreenLoading2(true);
      const response = await fetch('https://globaltrans.in/backend/get-popular-posts.php', {
        headers: {
        }
      });

      if (!response.ok) {
        const errRes = await response.json();
        throw new Error(errRes.message);
      }

      const fetchedData = await response.json();
      setPopularPosts(fetchedData);

    } catch (error) {
      console.error('Fetch error:', error.message);
    } finally {
      setIsScreenLoading2(false);
    }

  }

  const divRef = useRef();
  const divRef1 = useRef();
  const divRef2 = useRef();
  const [loaded, setLoaded] = useState(false);
  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);

  useIntersectionObserver2(divRef, () => {
    if (!loaded) {
      setLoaded(true); // Load only once
    }
  });
  useIntersectionObserver2(divRef1, () => {
    if (!loaded1) {
      setLoaded1(true); // Load only once
    }
  });
  useIntersectionObserver2(divRef2, () => {
    if (!loaded2) {
      setLoaded2(true); // Load only once
    }
  });

  useEffect(() => {

    if(loaded) getPopularPosts();
    if(loaded) getRecentPosts();

  }, [loaded]);

  return (

    <div ref={divRef} className={mainSection}>

      {/* <h2>Categories</h2> */}

      <div className={categoriesDiv}>

        <div className={categories} onClick={() => { navigate('/blog') }}>
          <p>Household Moving</p>
          <span>7</span>
        </div>

        <div className={categories} onClick={() => { navigate('/blog') }}>
          <p>International Moving</p>
          <span>2</span>
        </div>

        <div className={categories} onClick={() => { navigate('/blog') }}>
          <p>Transports Takecare</p>
          <span>3</span>
        </div>

        <div className={categories} onClick={() => { navigate('/blog') }}>
          <p>Relocation Moving</p>
          <span>6</span>
        </div>

      </div>

      <h2>Recent posts</h2>

      <div className={recentPostDiv} ref={divRef1}>
        {
          isScreenLoading1 && (<p style={{ textAlign: 'center' }}>Loading...</p>)
        }
        {
          (recentPosts.length === 0 && !isScreenLoading1) && (<p style={{ textAlign: 'center' }}> No posts available</p>)
        }

        {
          recentPosts && recentPosts.map((elem, i) => {

            const jsTime = elem?.time + 'z';
            const localDate = new Date(jsTime);

            // Extract the day and month-year based on the local time
            const date = localDate.getDate(); // Local date
            const options = { month: 'short', year: 'numeric' };
            const monthYear = localDate.toLocaleDateString('en-US', options);

            return (
              <div key={i} className={recentPost} onClick={() => {
                navigate(`/blogs/blog/${elem?.id}`)
              }}>
                <div className={imgContainer}>
                  <img src={loaded1 ? `https://globaltrans.in/backend/${elem?.imageurl}` : ''}  alt='blog image'/>
                </div>
                <div className={recentPostRight}>
                  <p>{elem?.title}</p>
                  <span>{date + ' ' + monthYear}</span>
                </div>
              </div>
            )
          })
        }

      </div>

      <h2>Popular posts</h2>

      <div className={recentPostDiv} ref={divRef2}>
        {
          isScreenLoading2 && (<p style={{ textAlign: 'center' }}>Loading...</p>)
        }
        {
          (recentPosts.length === 0 && !isScreenLoading2) && (<p style={{ textAlign: 'center' }}> No posts available</p>)
        }
        {
          popularPosts && popularPosts.map((elem, i) => {

            const jsTime = elem?.time + 'z';
            const localDate = new Date(jsTime);

            // Extract the day and month-year based on the local time
            const date = localDate.getDate(); // Local date
            const options = { month: 'short', year: 'numeric' };
            const monthYear = localDate.toLocaleDateString('en-US', options);

            return (
              <div key={i} className={recentPost} onClick={() => {
                navigate(`/blogs/blog/${elem?.id}`)
              }}>
                <div className={imgContainer}>
                  <img src={loaded2 ? `https://globaltrans.in/backend/${elem?.imageurl}` : ''} alt='blog image'/>
                </div>
                <div className={recentPostRight}>
                  <p>{elem?.title}</p>
                  <span>{date + ' ' + monthYear}</span>
                </div>
              </div>
            )
          })
        }

      </div>

      {/* <h2>Tags</h2> */}

      <div className={tagsView}>
        <div className={tagTop}>
          <span className={tag} onClick={() => { navigate('/blog') }}><IoMdPricetag />domestic</span>
          <span className={tag} onClick={() => { navigate('/blog') }}><IoMdPricetag />relocate</span>
        </div>
        <div className={tagBottom}>
          <span className={tag} onClick={() => { navigate('/blog') }}><IoMdPricetag />transports</span>
          <span className={tag} onClick={() => { navigate('/blog') }}><IoMdPricetag />household</span>
        </div>
      </div>

    </div>

  )
}

export default BlogSectionRight