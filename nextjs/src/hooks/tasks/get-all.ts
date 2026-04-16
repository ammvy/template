'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Task } from '@/types/task';

export function useGetAllTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await api.get<Task[]>('/tasks');
      return data;
    },
  });
}
