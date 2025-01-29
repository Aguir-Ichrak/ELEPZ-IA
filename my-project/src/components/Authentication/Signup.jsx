import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [confirmPsw, setConfirmPsw] = useState("");
  const dispatch = useDispatch();
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

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !psw || !confirmPsw) {
      notif({ type: "error", msg: "All fields are required." });
      return;
    }
    if (psw !== confirmPsw) {
      notif({ type: "error", msg: "Passwords do not match." });
      return;
    }

    try {
      const result = await dispatch(register({ name, email, password: psw }));

      if (result.succes) {
        notif({ msg: result.msg });
        window.dispatchEvent(new Event('storage'));
        navigate("/");
      } else {
        notif({ type: "error", msg: result.msg });
      }
    } catch (err) {
      notif({ type: "error", msg: "Registration Error." });
    }
  };

  return (
    <div className="bg-gray-800 flex flex-col justify-center h-full">
      <ToastContainer />
      <form
        className="max-w-[400px] mx-auto rounded-lg bg-gray-900 p-8 px-10 lg:w-1/3 3xs:w-2/3"
        onSubmit={handleSignUp}
      >
        <h2 className="text-4xl text-white font-bold text-center">SIGN UP</h2>
        <div className="flex flex-col text-gray-400 py-3">
          <label>Username</label>
          <input
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col text-gray-400 py-3">
          <label>User Email</label>
          <input
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col text-gray-400 py-3">
          <label>Password</label>
          <input
            className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="password"
            value={psw}
            onChange={(e) => setPsw(e.target.value)}
          />
        </div>
        <div className="flex flex-col text-gray-400 py-3">
          <label>Confirm Password</label>
          <input
            className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="password"
            value={confirmPsw}
            onChange={(e) => setConfirmPsw(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full my-5 py-2 bg-indigo-800 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg px-9"
        >
          Create Account
        </button>
        <div className="text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link to="/signin" className="text-indigo-900 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
