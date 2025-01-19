import React, { useState } from "react";

const TabFour = () => {
    const [modal, setModal] = useState(false);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
    
      const openModal = () => {
        setModal(true);
      };
    
      const closeModal = () => {
        setModal(false);
      };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex  flex-row  gap-3 text-[20px] font-semibold mt-[2rem]">
        <h1>Your Balance:</h1>
        <p>
          $ <span>1200</span>
        </p>
      </div>
      <button
      onClick={openModal}
      className="bg-[#5E3BE8] px-[34px] py-[15px] rounded-full text-white text-[14px] font-semibold hover:bg-[#522ee4] duration shadow-lg shadow-[#5e3be87e] mt-[2rem]">
        Recharge
      </button>
      {modal && (
        <div className="bg-black bg-opacity-70 flex justify-center items-center z-50 fixed h-full w-full inset-0">
          <div className="bg-[#F5F3FE] rounded-lg w-[90%] md:w-[70%] lg:w-[600px] flex flex-col justify-center items-center px-2 md:px-[2rem] py-[3rem]">
            <h1 className="font-semibold text-[20px] mt-3">
              Recharge you account
            </h1>

            <form className="mt-[2rem] w-full flex flex-col gap-3 justify-center items-center">
              <input
                type="text"
                placeholder="Amount"
                className="w-full px-5 py-3 rounded-md outline-[#5E3BE8] border"
              />

              <div className="flex flex-row gap-3 w-full">
                <button className="bg-[#5E3BE8] w-full mt-6 px-[34px] py-[15px] rounded-full text-white text-[14px] font-semibold hover:bg-[#522ee4] duration shadow-lg shadow-[#5e3be87e]">
                  Send
                </button>
                <button
                  onClick={closeModal}
                  className="bg-[#5E3BE8] w-full mt-6 px-[34px] py-[15px] rounded-full text-white text-[14px] font-semibold hover:bg-[#522ee4] duration shadow-lg shadow-[#5e3be87e]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabFour;
