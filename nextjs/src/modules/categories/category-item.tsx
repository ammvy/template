"use client";

import React, { useState } from "react";
import { Category } from "@/types/category";
import { Button } from "@/components/button";
import { Edit2, Trash2 } from "lucide-react";

interface CategoryItemProps {
  category: Category;
  onEdit: (category: Category) => void;
}

export function CategoryItem({ category, onEdit }: CategoryItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja deletar esta categoria?"))
      return;

    console.log("Mock delete category:", category.id);
  };

  return (
    <div className="bg-brand-surface border border-brand-border rounded-lg p-4 hover:shadow-md transition">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 p-2">
          <div
            className="w-12 h-12 rounded-lg"
            style={{ backgroundColor: category.cor }}
          />
          <h3 className="font-semibold text-brand-gray-light text-lg">
            {category.nome}
          </h3>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(category)}
            className="text-foreground/30 hover:text-brand-red transition-colors p-2"
            title="Editar"
          >
            <Edit2 size={20} />
          </button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-foreground/30 hover:text-brand-red transition-colors p-2 h-auto w-auto"
          >
            <Trash2 size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
