const { default: axios } = require("axios");

const baseUrl = 'http://localhost:5000/api';

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
export const doSignup = data =>  axios.post(`${baseUrl}/auth/signup`, data);

// user signin
export const doSignin = data =>  axios.post(`${baseUrl}/auth/`, data);

// change password
export const changePassword = data =>  request.post(`${baseUrl}/auth/changePassword`, data);

// get all products
export const getAllProducts = () =>  axios.get(`${baseUrl}/products`);

// get single product
export const getSingleProduct = id =>  axios.get(`${baseUrl}/products/${id}`);

// add to cart
export const addToCart = data =>  request.post(`${baseUrl}/products/addCart`, data);

// get cart list
export const getCartData = () =>  request.get(`${baseUrl}/products/getCart`);

// delete cart item
export const deleteCartItem = id =>  request.delete(`${baseUrl}/products/addCartRemove/${id}`);

// get user addresses
export const getUserAddresses = () =>  request.get(`${baseUrl}/address`);

// create user details
export const createUserAddress = data =>  request.post(`${baseUrl}/address/addAddress`, data);

// make address default
export const setDefaultAddress = data =>  request.put(`${baseUrl}/address/setAddressDefault`, data);

// get user profile
export const getUserProfile = () =>  request.get(`${baseUrl}/user`);

// update user profile
export const updateUserProfile = data =>  request.put(`${baseUrl}/user/update-profile`, data);

// create order
export const createOrder = data =>  request.post(`${baseUrl}/orders/create-order`, data);

// payment verification
export const verifyPayment = data =>  request.post(`${baseUrl}/orders/verify-payment`, data);

// get all orders
export const getAllOrders = () =>  request.get(`${baseUrl}/orders/get-order`);

// get order details by id
export const getOrderDetailsById = id =>  request.get(`${baseUrl}/orders/getOne-order/${id}`);

// delete address
export const deleteAddress = id =>  request.delete(`${baseUrl}/address/addressDelete/${id}`);