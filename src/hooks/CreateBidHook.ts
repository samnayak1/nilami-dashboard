import { useMutation } from "@tanstack/react-query";


import { message, Modal } from "antd";
import { ApiEndpoints } from "../types/endpoints";
import type { CreateBidRequest } from "../types";
import axiosClient from "../api/services/axiosClient";



export const useCreateBid = () => {

  return useMutation({
    mutationFn: async (data: CreateBidRequest) => {
      const response = await axiosClient.post(ApiEndpoints.CREATE_BID, data);
      return response.data;
    },
    onError: (error: any) => {

      const serverMessage = error.response?.data?.message || "Bid submission failed";
      message.error(serverMessage);
    },
    onSuccess: () => {
      Modal.success({
        title: 'Placed successfully',
        content: 'Your bid is live.',
        centered: true,
        okText: 'Ok',
        onOk: () => close(),
      });
    }
  });
};

