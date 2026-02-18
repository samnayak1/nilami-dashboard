import { useMutation } from "@tanstack/react-query";

import { message } from "antd";
import type { ApiResponse } from "../types/apiResponseTypes";
import { ApiEndpoints } from "../types/endpoints";
import type { SignUpRequestType, User } from "../types";
import axiosClient from "../api/services/axiosClient";


const signupUser = async (data: SignUpRequestType) => {
  const response = await axiosClient.post<ApiResponse<User>>(ApiEndpoints.SIGNUP, data);
  return response.data.data;
};

export const useSignup = () => {

  return useMutation({
    mutationFn: signupUser,
   
    onError: (error: any) => {
      const errorMsg = error.response?.data?.message || 'Signup failed';
      message.error(errorMsg);
    },
  });
};