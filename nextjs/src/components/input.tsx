'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-foreground/80 mb-1.5 ml-0.5">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2.5 bg-brand-white border rounded-xl transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red
          ${error ? 'border-red-500' : 'border-brand-gray/10'}
        `}
        {...props}
      />
      {error && <p className="text-red-600 text-xs mt-1.5 ml-1 font-medium">{error}</p>}
    </div>
  );
}
