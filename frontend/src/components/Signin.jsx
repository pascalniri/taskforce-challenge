import React from "react";

const Signin = () => {
  return (
    <div className="mx-auto max-w-7xl grid grid-cols-1 justify-items-center font-quicksand px-4 md:px-[30px] lg:px-0">
      <div className="w-[100%] md:w-[70%] lg:w-[600px] h-full  flex flex-col justify-center items-center px-[1rem] md:px-[5rem] py-[25px] bg-[#F5F3FE] rounded-lg">
      <a href="/" className="bg-white h-[120px] w-[120px] flex justify-center items-center rounded-full">
          <h1 className="font-bold text-[25px]">
            <span className="text-[#5E3BE8]">e</span>Wallet
          </h1>
        </a>
        <h1 className="font-semibold text-[20px] mt-3">
          Sign in to your account!
        </h1>

        <form className="mt-[2rem] w-full flex flex-col gap-3 justify-center items-center">
            <input type="email" placeholder="Email" className="w-full px-5 py-3 rounded-md outline-[#5E3BE8] border"/>
            <input type="password" placeholder="Password" className="w-full px-5 py-3 rounded-md outline-[#5E3BE8] border"/>
            <button className='bg-[#5E3BE8] w-full mt-6 px-[34px] py-[15px] rounded-full text-white text-[14px] font-semibold hover:bg-[#522ee4] duration shadow-lg shadow-[#5e3be87e]'>Sign in</button>
            <p className="mt-4">Don't have an eWallet account? <a href="/signup" className="font-semibold text-[#5E3BE8]">Create Account</a></p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
