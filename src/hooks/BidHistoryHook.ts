import { useQuery } from "@tanstack/react-query";
import axiosClient from "../configs/axiosClient";

import { ApiEndpoints } from "../types/endpoints";
import type { BidsResponse } from "../types";


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