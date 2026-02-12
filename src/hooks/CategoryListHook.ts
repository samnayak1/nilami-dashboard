import { useQuery } from '@tanstack/react-query';

import axiosClient from '../configs/axiosClient';
import { ApiEndpoints } from '../types/endpoints';
import type { CategoryResponse } from '../types';

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