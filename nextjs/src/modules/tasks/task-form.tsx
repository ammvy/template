"use client";

import React, { useState } from "react";
import { MOCK_CATEGORIES } from "@/constants/mock-data";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Task } from "@/types/task";

interface TaskFormProps {
  task?: Task;
  onSubmit?: () => void;
  onCancel: () => void;
}

export function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [nome, setNome] = useState(task?.nome || "");
  const [descricao, setDescricao] = useState(task?.descricao || "");
  const [categoriaId, setCategoriaId] = useState<number | undefined>(
    task?.categoriaId,
  );

  const categories = MOCK_CATEGORIES;

  const isLoading = false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      alert("Nome da tarefa é obrigatório");
      return;
    }

    const data = {
      id: task?.id,
      nome,
      descricao: descricao || undefined,
      categoriaId: categoriaId || undefined,
    };

    console.log("Mock save task:", data);
    onSubmit?.();
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

      <div className="w-full">
        <label className="block text-sm font-semibold text-foreground/80 mb-1.5 ml-0.5">
          Categoria
        </label>
        <select
          className="w-full px-4 py-2.5 bg-brand-white border border-brand-gray/10 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red disabled:opacity-50 appearance-none cursor-pointer"
          value={categoriaId || ""}
          onChange={(e) =>
            setCategoriaId(e.target.value ? Number(e.target.value) : undefined)
          }
          disabled={isLoading}
        >
          <option value="">Nenhuma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 justify-end pt-2">
        <button
          type="button"
          className="px-6 py-2.5 rounded font-semibold text-brand-gray bg-brand-gray-light hover:bg-brand-gray/85 hover:text-brand-gray-light transition-all active:scale-95 disabled:opacity-50"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="px-8 bg-brand-red-dark rounded hover:bg-red-dark/80"
        >
          {task ? "Atualizar" : "Criar"} Tarefa
        </Button>
      </div>
    </form>
  );
}
