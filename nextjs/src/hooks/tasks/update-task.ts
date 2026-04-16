"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Task } from "@/types/task";
import { TaskStatus } from "@/types/task-status";

interface UpdateTaskPayload {
  nome?: string;
  descricao?: string;
  status?: TaskStatus;
  categoriaId?: number;
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: UpdateTaskPayload & { id: number }) => {
      const { data } = await api.put<Task>(`/tasks/${id}`, payload);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
