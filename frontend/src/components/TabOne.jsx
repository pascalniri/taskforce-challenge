import React, { useEffect, useState } from "react";
import axios from "axios"
const TabOne = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [budgets, setBudgets] = useState('');

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const data = [
    {
      id: 1,
      budgetTitle: "Food & Drinks",
      budgetDesc: "Purchased food to be used in a period of one month",
      budgetAmount: "4538",
      budgetDate: "12-03-2024",
    },
    {
      id: 2,
      budgetTitle: "Water",
      budgetDesc: "Bought water for the week",
      budgetAmount: "4538",
      budgetDate: "12-03-2024",
    },
    {
      id: 3,
      budgetTitle: "Transport fees",
      budgetDesc: "Paid money of my transport fromand to home",
      budgetAmount: "4538",
      budgetDate: "12-03-2024",
    },
  ];

  useEffect(() => {
    const getTransactions = async() => {
        setLoading(true);
        setError(null)
  
        try {
          const response = await axios.get("http://localhost:8000/budgets/")
          setBudgets(response)
          console.log("The transactions are", response)
        } catch (error) {
            console.log(error);
            setError(error);
        } finally{
          setLoading(false)
        }
  
       
    };
    getTransactions();
  }, [])



  return (
    <div className="mt-8 w-full overflow-x-auto">
      <table className="w-full text-left bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-[#5E3BE8] text-white">
          <tr>
            <th className="py-3 px-6">Title</th>
            <th className="py-3 px-6">Description</th>
            <th className="py-3 px-6">Amount</th>
            <th className="py-3 px-6">Date</th>
            <th className="py-3 px-6">Action</th>
          </tr>
        </thead>
        <tbody className="text-[14px] font-medium">
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="py-4 px-6">{item.budgetTitle}</td>
              <td className="py-4 px-6">{item.budgetDesc}</td>
              <td className="py-4 px-6">{item.budgetAmount}</td>
              <td className="py-4 px-6">{item.budgetDate}</td>
              <td className="py-4 px-6 flex flex-row items-center">
                <button
                  className="text-[12px] font-semibold text-white bg-[#5E3BE8] px-[25px] py-[10px] rounded-full hover:bg-[#4d32c0] mr-2"
                  onClick={openModal}
                >
                  Edit
                </button>
                <button
                  className="text-[12px] font-semibold text-white bg-red-500 px-[25px] py-[10px] rounded-full hover:bg-red-600"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="relative">
        {modal && (
          <div className="bg-black bg-opacity-70 flex justify-center items-center z-50 fixed h-full w-full inset-0">
            <div className="bg-[#F5F3FE] rounded-lg w-[90%] md:w-[70%] lg:w-[600px] flex flex-col justify-center items-center px-2 md:px-[2rem] py-[3rem]">
              <h1 className="font-semibold text-[20px] mt-3">
                Edit your transactions!
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
                  <button onClick={closeModal} className="bg-[#5E3BE8] w-full mt-6 px-[34px] py-[15px] rounded-full text-white text-[14px] font-semibold hover:bg-[#522ee4] duration shadow-lg shadow-[#5e3be87e]">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabOne;
