import { $axios } from "./axios";

export const loginUser = async (values) =>
  await $axios.post("/user/login", values);
