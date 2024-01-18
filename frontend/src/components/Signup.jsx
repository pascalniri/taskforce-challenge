import { Link } from "react-router-dom";
import useSignup from "./hooks/useSignup";
import { Toaster } from "react-hot-toast";

const Signup = () => {
  const { errors, handleSubmit, onSubmit, register, formState: { touchedFields }, isLoading } = useSignup();

  const isInvalid = Object.keys(errors).length > 0;

  return (
    <div className="mx-auto max-w-7xl grid grid-cols-1 justify-items-center font-quicksand px-4 md:px-[30px] lg:px-0">
      <Toaster />
      <div className="w-[100%] md:w-[70%] lg:w-[600px] h-full flex flex-col justify-center items-center px-[1rem] md:px-[5rem] py-[25px] bg-[#F5F3FE] rounded-lg">
        <a href="/" className="bg-white h-[120px] w-[120px] flex justify-center items-center rounded-full">
          <h1 className="font-bold text-[25px]">
            <span className="text-[#5E3BE8]">e</span>Wallet
          </h1>
        </a>
        <h1 className="font-semibold text-[20px] mt-3">Create an account!</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-[2rem] w-full flex flex-col gap-3 justify-center items-center">
          <input
            type="text"
            placeholder="Full Name"
            className={`w-full px-5 py-3 rounded-md outline-[#5E3BE8] border ${
              errors.name && touchedFields.name ? 'border-red-500' : ''
            }`}
            {...register("name")}
          />
          {errors.name && touchedFields.name && (
            <p className="text-red-500 text-sm w-full text-left">{errors.name.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            className={`w-full px-5 py-3 rounded-md outline-[#5E3BE8] border ${
              errors.email && touchedFields.email ? 'border-red-500' : ''
            }`}
            {...register("email")}
          />
          {errors.email && touchedFields.email && (
            <p className="text-red-500 text-sm w-full text-left">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className={`w-full px-5 py-3 rounded-md outline-[#5E3BE8] border ${
              errors.password && touchedFields.password ? 'border-red-500' : ''
            }`}
            {...register("password")}
          />
          {errors.password && touchedFields.password && (
            <p className="text-red-500 text-sm w-full text-left">{errors.password.message}</p>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            className={`w-full px-5 py-3 rounded-md outline-[#5E3BE8] border ${
              errors.confirmPassword && touchedFields.confirmPassword ? 'border-red-500' : ''
            }`}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && touchedFields.confirmPassword && (
            <p className="text-red-500 text-sm w-full text-left">
              Passwords must match
            </p>
          )}

          <button 
            className={`bg-[#5E3BE8] w-full mt-6 px-[34px] py-[15px] rounded-full text-white text-[14px] font-semibold hover:bg-[#522ee4] duration shadow-lg shadow-[#5e3be87e] ${
              isInvalid ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            type="submit"
            disabled={isInvalid}
          >
            {isLoading ? "Loading..." : "Sign up"}
          </button>
          <p className="mt-4">
            Already have an eWallet account?{" "}
            <Link to="/signin" className="font-semibold text-[#5E3BE8]">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;