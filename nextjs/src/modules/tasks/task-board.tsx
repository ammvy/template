"use client";

import React, { useState } from "react";
import { useGetAllTasks } from "@/hooks/tasks";
import { Task } from "@/types/task";
import { TaskItem } from "./task-item";
import { TaskForm } from "./task-form";
import { Modal } from "@/components/modal";
import { Button } from "@/components/button";
import { Plus } from "lucide-react";

export function TaskBoard() {
  const { data: tasks = [], isLoading, error } = useGetAllTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTask(undefined);
  };

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-800">
        <p className="font-semibold">Erro ao carregar tarefas</p>
        <p className="text-sm mt-1">
          {error instanceof Error ? error.message : "Erro desconhecido"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
          Minhas Tarefas
        </h2>
        <Button
          variant="primary"
          onClick={() => {
            setSelectedTask(undefined);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg"
        >
          <Plus size={18} strokeWidth={2.5} />
          Nova Tarefa
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">
          Carregando tarefas...
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="mb-2">Nenhuma tarefa criada ainda</p>
          <p className="text-sm">Crie uma nova tarefa para começar</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks?.map((task) => (
            <TaskItem key={task.id} task={task} onEdit={handleEdit} />
          ))}
        </div>
      )}

      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={selectedTask ? "Editar Tarefa" : "Nova Tarefa"}
      >
        <TaskForm
          task={selectedTask}
          onSubmit={handleCloseForm}
          onCancel={handleCloseForm}
        />
      </Modal>
    </div>
  );
}
