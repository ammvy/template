"use client";

import React, { useState } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Category } from "@/types/category";

interface CategoryFormProps {
  category?: Category;
  onSubmit?: () => void;
  onCancel: () => void;
}

const colorOptions = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA502",
  "#FFD93D",
  "#6BCB77",
  "#9D84B7",
  "#FF6B9D",
];

export function CategoryForm({
  category,
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  const [nome, setNome] = useState(category?.nome || "");
  const [cor, setCor] = useState(category?.cor || colorOptions[0]);

  const isLoading = false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      alert("Nome da categoria é obrigatório");
      return;
    }

    console.log("Mock save category:", { id: category?.id, nome, cor });
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nome da categoria"
        placeholder="Digite o nome da categoria"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        disabled={isLoading}
      />
      <div className="w-full">
        <label className="block text-sm font-medium text-brand-gray-light mb-2">
          Cor
        </label>
        <div className="grid grid-cols-4 gap-2">
          {colorOptions.map((colorOption) => (
            <button
              key={colorOption}
              type="button"
              onClick={() => setCor(colorOption)}
              className={`w-full aspect-square rounded-lg border-2 transition ${
                cor === colorOption
                  ? "border-gray-900"
                  : "border-transparent hover:border-gray-300"
              }`}
              style={{ backgroundColor: colorOption }}
              title={colorOption}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {category ? "Atualizar" : "Criar"} Categoria
        </Button>
      </div>
    </form>
  );
}
