"use client";

import React, { useState } from "react";
import { useGetAllCategories } from "@/hooks/categories";
import { Category } from "@/types/category";
import { CategoryItem } from "./category-item";
import { CategoryForm } from "./category-form";
import { Modal } from "@/components/modal";
import { Button } from "@/components/button";
import { Plus } from "lucide-react";

export function CategoryBoard() {
  const { data: categories = [], isLoading, error } = useGetAllCategories();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedCategory(undefined);
  };

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-800">
        <p className="font-semibold">Erro ao carregar categorias</p>
        <p className="text-sm mt-1">
          {error instanceof Error ? error.message : "Erro desconhecido"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-brand-gray-light">Categorias</h2>
        <Button
          variant="primary"
          onClick={() => {
            setSelectedCategory(undefined);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          Nova Categoria
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">
          Carregando categorias...
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="mb-2">Nenhuma categoria criada ainda</p>
          <p className="text-sm">Crie uma nova categoria para começar</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={selectedCategory ? "Editar Categoria" : "Nova Categoria"}
      >
        <CategoryForm
          category={selectedCategory}
          onSubmit={handleCloseForm}
          onCancel={handleCloseForm}
        />
      </Modal>
    </div>
  );
}
