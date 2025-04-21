import axios from "axios";

const { baseUrl } = require("./api");

// Create an Axios instance
const adminRequest = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in every request
adminRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// admin login
export const doAdminLogin = (data) =>
  axios.post(`${baseUrl}/admin/signin`, data);

// get dashboard stats
export const getDashboardStats = () =>
  adminRequest.get(`${baseUrl}/admin/stats`);

// get all products
export const getProducts = () => axios.get(`${baseUrl}/admin/products`);

// add product
export const addProduct = (data) =>
  adminRequest.post(`${baseUrl}/admin/product`, data);

// get single product
export const getProductById = (id) =>
  axios.get(`${baseUrl}/admin/product/${id}`);

// update product
export const updateProductDetails = ({ id, data }) =>
  adminRequest.put(`${baseUrl}/admin/product/${id}`, data);

// delete product
export const deleteProductById = (id) =>
  adminRequest.delete(`${baseUrl}/admin/product/${id}`);

// get orders
export const getOrders = (currentPage) =>
  adminRequest.get(`${baseUrl}/admin/orders/${currentPage}`);

// get order details by id
export const getOrderById = (id) =>
  adminRequest.get(`${baseUrl}/admin/order/${id}`);

// add review
export const addReview = (data) =>
  adminRequest.post(`${baseUrl}/admin/review`, data);

// get all reviews
export const getReviews = (id) => adminRequest.get(`${baseUrl}/admin/reviews/${id}`);

// update review
export const updateReview = (data,id) =>
  adminRequest.patch(`${baseUrl}/admin/review/${id}`, data);

// delete review
export const deleteReviewById = (id) =>
  adminRequest.delete(`${baseUrl}/admin/review/${id}`);