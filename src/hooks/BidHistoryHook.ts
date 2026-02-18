import { useQuery } from "@tanstack/react-query";


import { ApiEndpoints } from "../types/endpoints";
import type { BidsResponse } from "../types";
import axiosClient from "../api/services/axiosClient";


export const useBidHistory = (itemId: string | undefined) => {
  return useQuery({
    queryKey: ['bids', itemId],
    queryFn: async () => {
      const response = await axiosClient.get<BidsResponse>(`${ApiEndpoints.BID_HISTORY}${itemId}`);
      return response.data;
    },
    enabled: !!itemId,
  });
};