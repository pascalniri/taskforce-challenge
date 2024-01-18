import { Toaster } from "react-hot-toast";
import useWallet from "./hooks/useWallet";

const TabTwo = () => {
  const {
    errors,
    handleSubmit,
    onSubmit,
    register,
    formState: { touchedFields },
    isLoading,
    handleCancel
  } = useWallet();

  const isInvalid = Object.keys(errors).length > 0;

  return (
    <div className="flex justify-center items-center py-[5rem]">
      <Toaster />
      <div className="bg-[#F5F3FE] rounded-lg w-[90%] md:w-[70%] lg:w-[600px] flex flex-col justify-center items-center px-2 md:px-[2rem] py-[3rem]">
        <h1 className="font-semibold text-[20px] mt-3">
          Add new transactions!
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-[2rem] w-full flex flex-col gap-3 justify-center items-center">
          <input
            type="text"
            placeholder="Title"
            className={`w-full px-5 py-3 rounded-md outline-[#5E3BE8] border ${
              errors.budgetTitle && touchedFields.budgetTitle ? 'border-red-500' : ''
            }`}
            {...register("budgetTitle")}
          />
          {errors.budgetTitle && touchedFields.budgetTitle && (
            <p className="text-red-500 text-sm w-full text-left">{errors.budgetTitle.message}</p>
          )}

          <input
            type="text"
            placeholder="Description"
            className={`w-full px-5 py-3 rounded-md outline-[#5E3BE8] border ${
              errors.budgetDescription && touchedFields.budgetDescription ? 'border-red-500' : ''
            }`}
            {...register("budgetDescription")}
          />
          {errors.budgetDescription && touchedFields.budgetDescription && (
            <p className="text-red-500 text-sm w-full text-left">{errors.budgetDescription.message}</p>
          )}

          <input
            type="number"
            placeholder="Amount"
            className={`w-full px-5 py-3 rounded-md outline-[#5E3BE8] border ${
              errors.budgetAmount && touchedFields.budgetAmount ? 'border-red-500' : ''
            }`}
            {...register("budgetAmount")}
          />
          {errors.budgetAmount && touchedFields.budgetAmount && (
            <p className="text-red-500 text-sm w-full text-left">{errors.budgetAmount.message}</p>
          )}

          <input
            type="date"
            className={`w-full px-5 py-3 rounded-md outline-[#5E3BE8] border ${
              errors.budgetDate && touchedFields.budgetDate ? 'border-red-500' : ''
            }`}
            {...register("budgetDate")}
          />
          {errors.budgetDate && touchedFields.budgetDate && (
            <p className="text-red-500 text-sm w-full text-left">{errors.budgetDate.message}</p>
          )}

          <div className="flex flex-row gap-3 w-full">
            <button
              type="submit"
              className={`bg-[#5E3BE8] w-full mt-6 px-[34px] py-[15px] rounded-full text-white text-[14px] font-semibold hover:bg-[#522ee4] duration shadow-lg shadow-[#5e3be87e] ${
                isInvalid || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
              disabled={isInvalid || isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 w-full mt-6 px-[34px] py-[15px] rounded-full text-white text-[14px] font-semibold hover:bg-gray-600 duration shadow-lg shadow-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TabTwo;