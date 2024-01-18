import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const token = sessionStorage.getItem('token');


const axiosInstance = axios.create({baseURL: BASE_URL+'/api/v1'});
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
if(token){
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
export default axiosInstance;