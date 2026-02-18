import { useMutation } from "@tanstack/react-query";


import { message } from "antd";
import { ApiEndpoints } from "../types/endpoints";
import type { IdempotentResponse } from "../types";
import axiosClient from "../api/services/axiosClient";


export const useGetIdempotentKey = () => {
  return useMutation({
    mutationFn: async (data: { itemId: string; bidAmount: number }) => {
      const response = await axiosClient.post<IdempotentResponse>(
        ApiEndpoints.IDEMPOTENT_KEY, 
        data
      );
      return response.data;
    },
    onError: () => {
      message.error("Failed to secure bid session. Please try again.");
    }
  });
};