import axios from "axios";

const API_URL = `http://localhost:5000/api/auth/`;

// login
export const login = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/login`, payload);
    localStorage.setItem("token", response.data.token); 
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

// register
export const register = async (payload) => {
    try {
      const response = await axios.post(`${API_URL}/register`, payload);
      localStorage.setItem("token", response.data.token); 
      return response.data; 
    } catch (error) {
      throw error; 
    }
  };
// logout
export const logout = () => {
  localStorage.removeItem("token"); 
};

const authAxios = axios.create({
  baseURL: API_URL, 
});

authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized: Token expired or invalid.");
      logout(); 
    }
    return Promise.reject(error);
  }
);

export default authAxios;
