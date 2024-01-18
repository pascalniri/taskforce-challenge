import { useEffect, useState } from "react";
import axiosInstance from "../../plugins/axios";

export default function useExpenses(){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        console.log(id)
        // try {
        //     const response = await axiosInstance.delete(`/budget/${id}`);
        //     handleFetchExpenses();
        //     return response.data;
        // } catch (error) {
        //     console.error("Delete expense error:", error);
        // }
    }

    const handleUpdateExpense = async (id) => {
        console.log(id)
    //     try {
    //         const response = await axiosInstance.put(`/budget/${id}`, data);
    //         handleFetchExpenses();
    //         return response.data;
    //     } catch (error) {
    //         console.error("Update expense error:", error);
    // }
}

    return {
        data,
        handleFetchExpenses,
        handleDeleteExpense,
        handleUpdateExpense,
        isLoading
    }
}