import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../plugins/axios";
// import { useNavigate } from "react-router-dom";


export default function useSignup() {
    const [isLoading, setIsLoading] = useState(false);
    // const navigate = useNavigate();

    const validationSchema = yup.object().shape({
        name: yup.string().required("Full name is required"),
        email: yup.string().email("Please enter a valid email").required("Email is required"),
        password: yup
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(15, "Password must not exceed 15 characters")
            .required("Password is required"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], "Passwords must match")
            .required("Please confirm your password"),
    });

    const { 
        handleSubmit, 
        formState: { errors, touchedFields }, 
        register 
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange" // This will make validation run on change instead of just on submit
    });

    const onSubmit = (data) => {
        setIsLoading(true);
        delete data.confirmPassword;
        axiosInstance.post("/auth/register", data)
            .then((res) => {
                console.log(res.data?.data);
                localStorage.setItem("token", res.data.data.token);
                toast.success("Account created successfully");
                // navigate("/dashboard");
                window.location.href = "/dashboard";
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
                console.error(error);
                setIsLoading(false);
            });
    };

    return { handleSubmit, onSubmit, errors, register, formState: { touchedFields }, isLoading };
}