import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../plugins/axios";


export default function useSignin() {
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = yup.object().shape({
        email: yup.string().email("Please enter a valid email").required("Email is required"),
        password: yup
            .string()
            .required("Password is required")
    });

    const { 
        handleSubmit, 
        formState: { errors, touchedFields }, 
        register 
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange" 
    });

    const onSubmit = (data) => {
        setIsLoading(true);
        axiosInstance.post("/auth/login", data)
            .then((res) => {
                console.log(res.data?.data);
                localStorage.setItem("token", res.data.data.token);
                toast.success("Logged in successfully");
                // navigate("/dashboard", { replace: true });
                window.location.href = "/dashboard";
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Invalid email or password");
                console.error(error);
                setIsLoading(false);
            });
    };

    return { handleSubmit, onSubmit, errors, register, formState: { touchedFields }, isLoading };
}