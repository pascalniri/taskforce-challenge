import { useEffect, useState } from "react";
import axiosInstance from "../../plugins/axios";
// import { useNavigate } from "react-router-dom";

export default function useDashboard(){
    // const navigate = useNavigate();


    const [user, setUser] = useState({
        name: "",
        email: ""
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const pathname = window.location.pathname;
        if (!token && pathname == "/dashboard") {
            window.location.href = '/signin';
        }
    }, []);

    const [walletInfo, setWalletInfo] = useState(null);

    const handleFetchProfile = () => {
        axiosInstance.get("/auth/profile")
            .then((res) => {
                console.log(res.data?.data);
                setUser(res.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleFetchWalletInfo = () => {
        axiosInstance.get("/wallet/balance")
            .then((res) => {
                console.log(res.data?.data);
                setWalletInfo(res.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const logout = () => {
        localStorage.removeItem("token");
        // navigate("/signin", {replace: true});
        window.location.href = "/signin";
    }

    useEffect(() => {
        handleFetchProfile();
        handleFetchWalletInfo();
    },[]);

    return { 
        user,
        walletInfo,
        logout,
        handleFetchWalletInfo
    };
}