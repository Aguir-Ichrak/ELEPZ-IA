import axios from 'axios';

const API_URL = `http://localhost:5000/api/blogs/`;

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['x-auth-token'] = token; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchBlogs = async (payload) => {
  try {
    const response = await axiosInstance.get(API_URL,payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBlog = async (blogData) => {
  try {
    const response = await axiosInstance.post(API_URL, blogData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, blogData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};

export const getBlog = async (id) => {
  try {
    const response = await  axiosInstance.get(`${API_URL}/${id}`);
    return response.data
  } catch (error) {
    throw error;
  }
};