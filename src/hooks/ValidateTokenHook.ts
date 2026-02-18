import { useQuery } from "@tanstack/react-query";


import useAuthStore from "../store/useAuthStore";
import { ApiEndpoints } from "../types/endpoints";
import type { ValdateTokenResponseType, ValidateTokenRequestType } from "../types";
import axiosClient from "../api/services/axiosClient";

const vaildateUser = async (data: ValidateTokenRequestType) => {
  const response = await axiosClient
              .post<ValdateTokenResponseType>(ApiEndpoints.VALIDATE_SESSION, data);
  return response.data;
};

export const useValidateSession = () => {
  const { accessToken } = useAuthStore();

  return useQuery({
    queryKey: ['validate-token', accessToken],
    queryFn: () => vaildateUser({ token: accessToken! }),
    enabled: !!accessToken, 
    retry: false,
    staleTime: 1000 * 60 * 5, 
  });
};