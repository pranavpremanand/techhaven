const { default: axios } = require("axios");

const baseUrl = 'http://localhost:5000';

// Create an Axios instance
const request = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  // Add a request interceptor to include the token in every request
  request.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

// user signup
export const doSignup = data =>  axios.post(`${baseUrl}/api/auth/signup`, data);

// user signin
export const doSignin = data =>  axios.post(`${baseUrl}/api/auth/`, data);

// get all products
export const getAllProducts = () =>  axios.get(`${baseUrl}/api/products`);

// add to cart
export const addToCart = data =>  request.post(`${baseUrl}/api/products/addCart`, data);

// get cart list
export const getCartData = () =>  request.get(`${baseUrl}/api/products/getCart`);