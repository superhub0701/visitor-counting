import axios from 'axios';
// import authHeader from "./auth-header";
export const baseUrl = 'http://localhost';

export const login = (data) => axios.post(`${baseUrl}/api/auth/login`, data)

export const forgotpassword = (data) => axios.post(`${baseUrl}/api/auth/forgotpassword`, data)

// export const getGalleria = () => axios.get(`${baseUrl}/visitor-api?type=galleria`, {headers:authHeader()})
export const getGalleria = () => axios.get(`${baseUrl}/visitor-api.php?type=galleria`)
export const getDashboard = () => axios.get(`${baseUrl}/visitor-api.php?type=dashboard`)
export const getCanopy = () => axios.get(`${baseUrl}/visitor-api.php?type=canopy`);
export const getCity = () => axios.get(`${baseUrl}/visitor-api.php?type=city`);
export const getMarket = () => axios.get(`${baseUrl}/visitor-api.php?type=market`);

