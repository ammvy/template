'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Category } from '@/types/category';

export function useGetAllCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get<Category[]>('/categories');
      return data;
    },
  });
}
