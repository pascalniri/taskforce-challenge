import { Toaster } from "react-hot-toast";
import useRecharge from "./hooks/useRecharge";

const TabFour = () => {
    const {
        errors,
        handleSubmit,
        onSubmit,
        register,
        formState: { touchedFields },
        isLoading,
        modal,
        openModal,
        closeModal,
        walletInfo
    } = useRecharge();

    const isInvalid = Object.keys(errors).length > 0;

    return (
        <div className="flex flex-col justify-center items-center">
            <Toaster />
            <div className="flex flex-row gap-3 text-[20px] font-semibold mt-[2rem] items-center">
                <h1>Your Balance:</h1>
                {!walletInfo ?
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#5E3BE8] border-t-transparent" />
                :
                <p>
                    <span>{parseInt(walletInfo?.balance).toLocaleString() || "0"} {walletInfo?.currency}</span>
                </p>
                }
            </div>
            <button
                onClick={openModal}
                className="bg-[#5E3BE8] px-[34px] py-[15px] rounded-full text-white text-[14px] font-semibold hover:bg-[#522ee4] duration shadow-lg shadow-[#5e3be87e] mt-[2rem]"
            >
                Recharge
            </button>

            {modal && (
                <div className="bg-black bg-opacity-70 flex justify-center items-center z-50 fixed h-full w-full inset-0">
                    <div className="bg-[#F5F3FE] rounded-lg w-[90%] md:w-[70%] lg:w-[600px] flex flex-col justify-center items-center px-2 md:px-[2rem] py-[3rem]">
                        <h1 className="font-semibold text-[20px] mt-3">
                            Recharge your account
                        </h1>

                        <form onSubmit={handleSubmit(onSubmit)} className="mt-[2rem] w-full flex flex-col gap-3 justify-center items-center">
                            <div className="w-full">
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    className={`w-full px-5 py-3 rounded-md outline-[#5E3BE8] border ${
                                        errors.amount && touchedFields.amount ? 'border-red-500' : ''
                                    }`}
                                    {...register("amount")}
                                />
                                {errors.amount && touchedFields.amount && (
                                    <p className="text-red-500 text-sm mt-1 text-left">{errors.amount.message}</p>
                                )}
                            </div>

                            <div className="flex flex-row gap-3 w-full">
                                <button
                                    type="submit"
                                    className={`bg-[#5E3BE8] w-full mt-6 px-[34px] py-[15px] rounded-full text-white text-[14px] font-semibold hover:bg-[#522ee4] duration shadow-lg shadow-[#5e3be87e] ${
                                        isInvalid || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                    }`}
                                    disabled={isInvalid || isLoading}
                                >
                                    {isLoading ? 'Processing...' : 'Send'}
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-500 w-full mt-6 px-[34px] py-[15px] rounded-full text-white text-[14px] font-semibold hover:bg-gray-600 duration shadow-lg shadow-gray-400"
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