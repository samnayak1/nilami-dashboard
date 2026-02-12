import { useMutation } from "@tanstack/react-query";
import axiosClient from "../configs/axiosClient";

import { message } from "antd";
import { ApiEndpoints } from "../types/endpoints";
import type { LoginRequestType, LoginResponseType } from "../types";




const loginUser = async (data: LoginRequestType) => {
  const response = await axiosClient
  .post<LoginResponseType>(ApiEndpoints.LOGIN, data);
  return response.data;
};

export const useLogin = () => {
 
  return useMutation({
    mutationFn: loginUser,
    onError: (error: any) => {
      const errorMsg = error.response?.data?.message || 'Login failed';
      message.error(errorMsg);
    },
  });
};