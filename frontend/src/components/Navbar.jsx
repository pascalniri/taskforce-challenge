import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import useDashboard from "./hooks/useDashboard";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { walletInfo, logout } = useDashboard();

  // current path name
  // console.log(window.location.pathname);
  const pathname = window.location.pathname;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="font-quicksand flex items-center justify-between bg-white bg-opacity-25 backdrop-blur-[4px] sticky top-0 z-50 py-[30px] mx-auto max-w-7xl px-4 md:px-[30px] xl:px-0 mb-[5rem] lg:mb-0">
      {/* Logo */}
      <div>
        <a href="/" className="text-2xl font-bold">
          <span className="text-[#5E3BE8]">e</span>Wallet
        </a>
      </div>

      {/* Hamburger Icon for Small Screens */}
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-[#5E3BE8] text-2xl focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Links */}
      {!walletInfo && (pathname == "/" || pathname == "/signin" || pathname == "/signup") ?
      <ul
        className={`lg:flex flex-col lg:flex-row gap-10 absolute lg:static top-[70px] left-0 w-full lg:w-auto bg-white lg:bg-transparent px-6 lg:px-0 py-4 lg:py-0 z-40 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <li>
          <a href="/" className="font-semibold">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="font-semibold">
            How it Works
          </a>
        </li>
        <li>
          <a href="#" className="font-semibold">
            Contact Us
          </a>
        </li>
        <li className="lg:hidden mt-5">
          <button className="bg-[#5E3BE8] px-[34px] py-[15px] rounded-full text-white text-[14px] font-semibold hover:bg-[#522ee4] duration shadow-lg shadow-[#5e3be87e] ">
            Sign in
          </button>
        </li>
      </ul>
      :
      <>
      {!walletInfo ? 
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#5E3BE8] border-t-transparent" />
                :
                <label className="font-bold"><span>{parseInt(walletInfo?.balance)?.toLocaleString()} </span>  <span className="text-[#5E3BE8]">{walletInfo?.currency} </span></label>
              }
      </>
      }

      {/* Sign-in Button */}
      <div className="hidden lg:block">
        {!walletInfo ? (
          <a href="/signin">
          <button className="bg-[#5E3BE8] px-[34px] py-[15px] rounded-full text-white text-[14px] font-semibold hover:bg-[#522ee4] duration shadow-lg shadow-[#5e3be87e] ">
          Sign in{" "}
          </button>
          </a>
        ) : (
          <button onClick={logout} className="bg-[#5E3BE8] cursor-pointer  px-[34px] py-[15px] rounded-full text-white text-[14px] font-semibold hover:bg-[#522ee4] duration shadow-lg shadow-[#5e3be87e] ">
          Logout{" "}
        </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
