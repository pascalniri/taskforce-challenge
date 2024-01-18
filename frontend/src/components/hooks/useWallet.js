import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { toast } from "react-hot-toast"; // Assuming you're using react-hot-toast
import axiosInstance from "../../plugins/axios";

export default function useWallet() {
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = yup.object().shape({
        budgetTitle: yup
            .string()
            .required("Title is required")
            .min(2, "Title must be at least 2 characters"),
        budgetDescription: yup
            .string()
            .required("Description is required")
            .min(3, "Description must be at least 3 characters"),
        budgetAmount: yup
            .number()
            .typeError("Amount must be a number")
            .required("Amount is required")
            .positive("Amount must be positive"),
        budgetDate: yup
            .date()
            .required("Date is required")
            .max(new Date(), "Date cannot be in the future")
    });

    const {
        handleSubmit,
        formState: { errors, touchedFields },
        register,
        reset
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post("/budget", data);
            toast.success("Transaction added successfully");
            reset(); // Reset form after successful submission
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to add transaction");
            console.error("Transaction error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        reset();
    };

    return {
        handleSubmit,
        onSubmit,
        errors,
        register,
        formState: { touchedFields },
        isLoading,
        handleCancel
    };
}