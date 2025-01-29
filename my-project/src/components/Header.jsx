import { useState } from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Header = () => {
  let Links = [
    { name: "HOME", link: "/" },
    { name: "ADD NEW BLOG", link: "/addBlog" },
  ];
  let [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutFn = () => {
    dispatch(logout())
    navigate("/signin");
  };
  return (
    <div className="shadow-md w-[500px] relative top-0 mt-6 mx-10 rounded-lg bg-gray-900">
      <div className="md:flex items-center justify-between py-4 md:px-8 px-7">
        <div className=" flex items-center gap-1">
          <img src="src/assets/white_logo.png" alt="Logo" className="h-6" />
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((link, index) => (
            <li
              key={index}
              className="md:ml-7 md:mr-7 md:my-0 my-7 font-semibold"
            >
              <a
                href={link.link}
                className="text-white hover:text-blue-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <img
          src="src/assets/logout.png"
          alt="Logo"
          className="h-5"
          onClick={logoutFn}
        />
      </div>
    </div>
  );
};

export default Header;
