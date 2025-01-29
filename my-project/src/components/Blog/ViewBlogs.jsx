import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import Pagination from "../Pagination";
import Searchbar from "../SearchBar";
import BlogCard from "./BlogCard";
import PropTypes from "prop-types";
import { loadBlogs } from "../../redux/slices/blogsSlice";

function AllBlogs() {
  const dispatch = useDispatch();
  const { blogs, currentPage, totalPages } = useSelector((state) => state.blogs); 

 
  useEffect(() => {
    dispatch(loadBlogs({params:{page:currentPage}})); 
  }, [dispatch, currentPage]); 

  const handlePageChange = (page) => {
    dispatch(loadBlogs({params:{page:page}})); 
  };

  return (
    <div>
    <div className="bg-gray-800 h-full flex flex-col">
    <Header />
      <Searchbar />
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <BlogCard
              key={index}
              title={blog.title}
              id={blog._id}
              category={blog.category}
              content={blog.content}
              image={blog.image}
            />
          ))
        ) : (
          <p className="text-white text-center">No blogs available.</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange} 
      />
    </div>
    </div>
  );
}

AllBlogs.propTypes = {
  blogs: PropTypes.array.isRequired,
};

export default AllBlogs;
