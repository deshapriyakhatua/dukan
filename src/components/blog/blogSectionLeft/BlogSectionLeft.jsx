import React, { Suspense } from 'react'
import {
  mainSection,
} from './BlogSectionLeft.module.css'
import AllBlogs from '../allBlogs/AllBlogs';
import BlogSinglePost from '../blogSinglePost/BlogSinglePost';
import { Route, Routes } from 'react-router-dom';


function BlogSectionLeft() {
  return (
    <div className={mainSection}>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              {/* <CSpinner color="primary" variant="grow" /> */}
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<AllBlogs />} />
            <Route path="/all-blogs" name="Blogs" element={<AllBlogs />} />
            <Route exact path="/blog/:id" name="Blog Post" element={<BlogSinglePost />} />
          </Routes>
        </Suspense>
    </div>
  )
}



export default BlogSectionLeft