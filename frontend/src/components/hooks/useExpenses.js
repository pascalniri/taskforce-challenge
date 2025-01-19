import { useEffect, useState } from "react";
import axiosInstance from "../../plugins/axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

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

export default function useExpenses(){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const methods = useForm(
        {
            resolver: yupResolver(validationSchema),
            mode: "onChange"
        }
    );
    const { setValue, register, handleSubmit, formState: {errors, touchedFields} } = methods;
    const handleFetchExpenses = () => {
        setIsLoading(true);
        axiosInstance.get("/budget")
            .then((res) => {
                setIsLoading(false);
                setData(res.data.data);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error("Fetch expenses error:", error);
            });
    }

    useEffect(() => {
        handleFetchExpenses();
    }
    , []);

    const handleDeleteExpense = async (id) => {
        setSelectedItem(id);
        try {
            setIsLoading(true);
            axiosInstance.delete(`/budget/${id}`)
            .then(() => {
                setIsLoading(false);
                toast.success("Expense deleted successfully");
                window.location.reload();
            }
            )
            .catch((error) => {
                setIsLoading(false);
                console.error("Delete expense error:", error);
                toast.error(error?.response?.data?.message || "An error occurred");
            });
        } catch (error) {
            console.error("Delete expense error:", error);
        }
    }

const onSubmit = (data) => {
    console.log(data);
    // use axiosInstance and patch to /budget/:id
    const objectId = data.id;
    delete data.id;
    setIsLoading(true);
    axiosInstance.patch(`/budget/${objectId}`, data)
        .then(() => {
            setIsLoading(false);
            toast.success("Expense updated successfully");
            window.location.reload();
        })
        .catch((error) => {
            setIsLoading(false);
            console.error("Update expense error:", error);
            toast.error(error?.response?.data?.message || "An error occurred");
        });
}

const setFormData = (data) => {
    setValue("budgetTitle", data.budgetTitle);
    setValue("budgetDescription", data.budgetDescription);
    setValue("budgetAmount", data.budgetAmount);
    setValue("budgetDate", new Date(data.budgetDate));
    setValue("id", data._id);
}

    return {
        data,
        handleFetchExpenses,
        handleDeleteExpense,
        isLoading,
        setFormData,
        methods,
        register,
        onSubmit,
        handleSubmit,
        errors,
        touchedFields,
        selectedItem
    }
}