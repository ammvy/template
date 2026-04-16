'use client';

import React, { useState } from 'react';
import { useCreateTask, useUpdateTask } from '@/hooks/tasks';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Task } from '@/types/task';

interface TaskFormProps {
  task?: Task;
  onSubmit?: () => void;
  onCancel: () => void;
}

export function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [nome, setNome] = useState(task?.nome || '');
  const [descricao, setDescricao] = useState(task?.descricao || '');

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const isLoading = createTask.isPending || updateTask.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      alert('Nome da tarefa é obrigatório');
      return;
    }

    try {
      if (task) {
        await updateTask.mutateAsync({
          id: task.id,
          nome,
          descricao: descricao || undefined,
        });
      } else {
        await createTask.mutateAsync({
          nome,
          descricao: descricao || undefined,
        });
      }
      onSubmit?.();
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nome da tarefa"
        placeholder="Digite o nome da tarefa"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        disabled={isLoading}
      />
      <Input
        label="Descrição"
        placeholder="Digite a descrição (opcional)"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        disabled={isLoading}
      />
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {task ? 'Atualizar' : 'Criar'} Tarefa
        </Button>
      </div>
    </form>
  );
}
