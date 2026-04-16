'use client';

import React, { useState } from 'react';
import { useUpdateCategory, useDeleteCategory } from '@/hooks/categories';
import { Category } from '@/types/category';
import { Button } from '@/components/button';
import { Edit2, Trash2 } from 'lucide-react';

interface CategoryItemProps {
  category: Category;
  onEdit: (category: Category) => void;
}

export function CategoryItem({ category, onEdit }: CategoryItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteCategory = useDeleteCategory();

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja deletar esta categoria?')) return;

    setIsDeleting(true);
    try {
      await deleteCategory.mutateAsync(category.id);
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-lg"
            style={{ backgroundColor: category.cor }}
          />
          <h3 className="font-semibold text-gray-900 text-lg">{category.nome}</h3>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(category)}
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
