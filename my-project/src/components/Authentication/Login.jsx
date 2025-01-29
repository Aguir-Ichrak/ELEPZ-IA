import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import loginImg from "../../assets/login.jpg";
import { login } from "../../redux/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const notif = (data) => {
    toast[data.type || "success"](data.msg || "", {
      position: data.position || "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: data.position || "colored",
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      notif({ type: "error", msg: "Email and password are required." });
      return;
    }
    try {
      const res = await dispatch(login({ email, password }));
      if (res.succes) {
        notif({ msg: "Login successfully" });
        window.dispatchEvent(new Event('storage'));
        navigate("/");
      } else {
        notif({ type: "error", msg: res.msg });
      }
    } catch (err) {
      notif({ type: "error", msg: "Login Error" });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="w-full h-full object-cover"
          src={loginImg}
          alt="Login"
        />
      </div>

      <div className="bg-gray-800 flex flex-col justify-center">
        <form
          className="max-w-[400px] mx-auto rounded-lg bg-gray-900 p-8 px-8 lg:w-3/5 3xs:w-4/5"
          onSubmit={handleLogin}
        >
          <h2 className="text-4xl text-white font-bold text-center">SIGN IN</h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full my-5 py-2 bg-indigo-800 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
          >
            SIGN IN
          </button>

          <div className="text-center">
            <p className="text-gray-400">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-indigo-900 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}
