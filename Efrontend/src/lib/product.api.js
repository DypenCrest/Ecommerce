import { $axios } from "./axios";

export const getProductBySeller = async () =>
  await $axios.post("/product/seller/all", { page: 1, limit: 10 });

export const getProductByBuyer = async () =>
  await $axios.post("/product/buyer/all", { page: 1, limit: 10 });
