import { useQuery } from '@tanstack/react-query';


import { ApiEndpoints } from '../types/endpoints';
import type { CategoryResponse } from '../types';
import axiosClient from '../api/services/axiosClient';

export const useCategories = (page = 0, size = 100) => {
  return useQuery<CategoryResponse>({
    queryKey: ['categories', page, size],
    queryFn: async () => {
      const { data } = await axiosClient.get<CategoryResponse>(ApiEndpoints.GET_CATEGORIES, {
        params: { page, size }
      });
      return data;
    },
  });
};