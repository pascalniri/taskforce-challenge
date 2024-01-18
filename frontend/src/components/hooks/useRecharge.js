import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../../plugins/axios";
import useDashboard from "./useDashboard";

export default function useRecharge() {
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const { walletInfo, handleFetchWalletInfo } = useDashboard();

    const validationSchema = yup.object().shape({
        amount: yup
            .number()
            .typeError("Amount must be a number")
            .required("Amount is required")
            .positive("Amount must be positive")
            .min(1, "Amount must be at least 1")
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
            const response = await axiosInstance.post("/wallet/deposit", data);
            toast.success("Account recharged successfully");
            reset();
            handleFetchWalletInfo();
            setModal(false);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to recharge account");
            console.error("Recharge error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const openModal = () => {
        setModal(true);
        reset();
    };

    const closeModal = () => {
        setModal(false);
        reset();
    };

    return {
        handleSubmit,
        onSubmit,
        errors,
        register,
        formState: { touchedFields },
        isLoading,
        modal,
        openModal,
        closeModal,
        walletInfo
    };
}