"use client";

import React, { useState } from "react";
import { Task } from "@/types/task";
import { TaskStatus } from "@/types/task-status";
import { Button } from "@/components/button";
import { Trash2, Edit2, Check } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const statusLabels = {
  [TaskStatus.PARADO]: "Parado",
  [TaskStatus.EM_ANDAMENTO]: "Em Andamento",
  [TaskStatus.CONCLUIDA]: "Concluída",
};

const statusColors = {
  [TaskStatus.PARADO]:
    "bg-brand-gray-light text-brand-gray border border-brand-gray/10",
  [TaskStatus.EM_ANDAMENTO]:
    "bg-brand-red/5 text-brand-red border border-brand-red/20",
  [TaskStatus.CONCLUIDA]:
    "bg-emerald-50 text-emerald-700 border border-emerald-100",
};

export function TaskItem({ task, onEdit }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleStatus = async () => {
    const nextStatus =
      task.status === TaskStatus.PARADO
        ? TaskStatus.EM_ANDAMENTO
        : TaskStatus.CONCLUIDA;

    console.log("Mock toggle status task:", task.id, "Next status:", nextStatus);
  };

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja deletar esta tarefa?")) return;

    console.log("Mock delete task:", task.id);
  };

  return (
    <div
      className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:shadow-xl hover:shadow-brand-red/5 transition-all duration-300 group overflow-hidden"
      style={{
        borderLeft: task.categoria?.cor
          ? `6px solid ${task.categoria.cor}`
          : undefined,
      }}
    >

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-foreground text-lg tracking-tight transition-colors">
            {task.nome}
          </h3>
          {task.descricao && (
            <p className="text-foreground/60 text-sm mt-1 leading-relaxed">
              {task.descricao}
            </p>
          )}
          <span
            className={`inline-block mt-3 px-3 py-0.5 rounded-full text-[10px] uppercase tracking-widest font-bold ${
              statusColors[task.status]
            }`}
          >
            {statusLabels[task.status]}
          </span>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={handleToggleStatus}
            className="text-foreground/30 hover:text-brand-red transition-colors p-2"
            title="Alterar status"
          >
            <Check size={18} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => onEdit(task)}
            className="text-foreground/30 hover:text-brand-red transition-colors p-2"
            title="Editar"
          >
            <Edit2 size={18} strokeWidth={2.5} />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-foreground/30 hover:text-red-600 transition-colors p-2"
            title="Deletar"
          >
            <Trash2 size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
