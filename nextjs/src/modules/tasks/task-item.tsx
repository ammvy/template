'use client';

import React, { useState } from 'react';
import { useUpdateTask, useDeleteTask } from '@/hooks/tasks';
import { Task } from '@/types/task';
import { TaskStatus } from '@/types/task-status';
import { Button } from '@/components/button';
import { Trash2, Edit2, Check } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const statusLabels = {
  [TaskStatus.PARADO]: 'Parado',
  [TaskStatus.EM_ANDAMENTO]: 'Em Andamento',
  [TaskStatus.CONCLUIDA]: 'Concluída',
};

const statusColors = {
  [TaskStatus.PARADO]: 'bg-gray-100 text-gray-800',
  [TaskStatus.EM_ANDAMENTO]: 'bg-yellow-100 text-yellow-800',
  [TaskStatus.CONCLUIDA]: 'bg-green-100 text-green-800',
};

export function TaskItem({ task, onEdit }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleToggleStatus = async () => {
    const nextStatus =
      task.status === TaskStatus.PARADO
        ? TaskStatus.EM_ANDAMENTO
        : TaskStatus.CONCLUIDA;

    try {
      await updateTask.mutateAsync({
        id: task.id,
        status: nextStatus,
      });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja deletar esta tarefa?')) return;

    setIsDeleting(true);
    try {
      await deleteTask.mutateAsync(task.id);
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">{task.nome}</h3>
          {task.descricao && (
            <p className="text-gray-600 text-sm mt-1">{task.descricao}</p>
          )}
          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
              statusColors[task.status]
            }`}
          >
            {statusLabels[task.status]}
          </span>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleToggleStatus}
            className="text-blue-600 hover:text-blue-700 transition p-2"
            title="Alterar status"
          >
            <Check size={20} />
          </button>
          <button
            onClick={() => onEdit(task)}
            className="text-gray-600 hover:text-gray-700 transition p-2"
            title="Editar"
          >
            <Edit2 size={20} />
          </button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 h-auto w-auto"
          >
            <Trash2 size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
