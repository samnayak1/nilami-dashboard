import { useQuery } from "@tanstack/react-query";


import { ApiEndpoints } from "../types/endpoints";
import type { UserBid, UserBidsResponse } from "../types";
import axiosClient from "../api/services/axiosClient";

export const useUserBids = () => {
  return useQuery<UserBid[]>({
    queryKey: ['user-bids'],
    queryFn: async () => {
      const { data } = await axiosClient.get<UserBidsResponse>(ApiEndpoints.GET_USERS_BIDS);
      return data.data;
    },
  });
};