import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { useState, useEffect } from 'react';
import store from './redux/store';
import BlogDetails from './components/Blog/BlogDetails';
import AllBlogs from './components/Blog/ViewBlogs';
import BlogCard from './components/Blog/BlogCard';
import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/Signup';
import BlogForm from './components/Blog/BlogForm';
function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  return (
    <Provider store={store}>
      <Routes>
        {token ? (
          <>
            <Route path="/addBlog" element={<BlogForm />} />
            <Route path="/details/:id" element={<BlogDetails />} />
            <Route path="/" element={<AllBlogs />} />
          </>
        ) : (
          <>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Navigate to="/signin" replace />} />
            <Route path="/addBlog" element={<Navigate to="/signin" replace />} />
            <Route path="/details/:id" element={<Navigate to="/signin" replace />} />
          </>
        )}
      </Routes>
    </Provider>
  );
}

export default App;
