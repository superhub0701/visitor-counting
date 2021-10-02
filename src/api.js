import axios from 'axios';
// import authHeader from "./auth-header";
// export const baseUrl = 'http://localhost';
export const baseUrl = '';

export const auth = (data) => axios.post(`${baseUrl}/visitor-api.php`, data)
export const setting = (data) => axios.post(`${baseUrl}/visitor-api.php`, data)

export const getGalleria = () => axios.get(`${baseUrl}/visitor.php?type=galleria`)
export const getDashboard = () => axios.get(`${baseUrl}/visitor.php?type=dashboard`)
export const getCanopy = () => axios.get(`${baseUrl}/visitor.php?type=canopy`);
export const getCity = () => axios.get(`${baseUrl}/visitor.php?type=city`);
export const getMarket = () => axios.get(`${baseUrl}/visitor.php?type=market`);
export const getQueue = () => axios.get(`${baseUrl}/visitor.php?type=queue`);
