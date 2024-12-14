import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-4 rounded-lg">
      <AlertCircle size={20} />
      <p>{message}</p>
    </div>
  );
}