import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog
} from "../../axios/blogAxios";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: {
      blogs: [],
      currentPage: 1,
      totalPages: 1,
      totalBlogs: 0,
    },
    selectedBlog: null
  },
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload.blogs;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.totalBlogs = action.payload.totalBlogs;
    },
    addBlog: (state, action) => {
      state.blogs.blogs.push(action.payload);
    },
    updateBlogState: (state, action) => {
      const index = state.blogs.blogs.findIndex(
        (blog) => blog.id === action.payload.id
      );
      if (index !== -1) {
        state.blogs.blogs[index] = action.payload;
      }
    },
    setBlogData: (state, action) => {
      state.selectedBlog =  action.payload
    },
  },
});

export const { setBlogs, addBlog, updateBlogState, setBlogData } =
  blogSlice.actions;

export const loadBlogs = (payload) => async (dispatch) => {
  try {
    const data = await fetchBlogs(payload);
    dispatch(setBlogs({
      blogs: data.blogs,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      totalBlogs: data.totalBlogs,
    }));
  } catch (error) {}
};

export const createNewBlog = (blogData) => async (dispatch) => {
  try {
    const newBlog = await createBlog(blogData);
    dispatch(addBlog(newBlog));
    return {
      succes: true,
      msg: "Blog added successfully!",
    };
  } catch (error) {
    return {
      succes: false,
      msg: error.response.data.msg,
    };
  }
};

export const editBlog = (id, blogData) => async (dispatch) => {
  try {
    const updatedBlog = await updateBlog(id, blogData);
    dispatch(updateBlogState(updatedBlog));
  } catch (error) {
    console.error("Error updating blog:", error.message);
  }
};

export const removeBlog = (id) => async (dispatch) => {
  try {
    await deleteBlog(id);
    return {
      succes: true,
      msg: "Blog deleted successfully!",
    };
  } catch (error) {
    return {
      succes: false,
      msg: error.response.data.msg,
    };
  }
};
export const getById = (id) => async (dispatch) => {
  try {
   const res = await getBlog(id);
    dispatch(setBlogData(res));
  } catch (error) {
    console.error("Error deleting blog:", error.message);
  }
};

export default blogSlice.reducer;
