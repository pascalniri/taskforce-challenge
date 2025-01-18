const TabTwo = () => {
    return (
      <div className="flex justify-center items-center py-[5rem]">
         <div className="bg-[#F5F3FE] rounded-lg w-[90%] md:w-[70%] lg:w-[600px] flex flex-col justify-center items-center px-2 md:px-[2rem] py-[3rem]">
              <h1 className="font-semibold text-[20px] mt-3">
                Add new transactions!
              </h1>

              <form className="mt-[2rem] w-full flex flex-col gap-3 justify-center items-center">
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full px-5 py-3 rounded-md outline-[#5E3BE8] border"
                />
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full px-5 py-3 rounded-md outline-[#5E3BE8] border"
                />
                 <input
                  type="text"
                  placeholder="Amount"
                  className="w-full px-5 py-3 rounded-md outline-[#5E3BE8] border"
                />
                <input
                  type="date"
                  className="w-full px-5 py-3 rounded-md outline-[#5E3BE8] border"
                />
                <div className="flex flex-row gap-3 w-full">
                  <button className="bg-[#5E3BE8] w-full mt-6 px-[34px] py-[15px] rounded-full text-white text-[14px] font-semibold hover:bg-[#522ee4] duration shadow-lg shadow-[#5e3be87e]">
                    Save
                  </button>
                  <button className="bg-[#5E3BE8] w-full mt-6 px-[34px] py-[15px] rounded-full text-white text-[14px] font-semibold hover:bg-[#522ee4] duration shadow-lg shadow-[#5e3be87e]">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
      </div>
    );
  };
  
  export default TabTwo;