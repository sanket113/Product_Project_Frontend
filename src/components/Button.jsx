import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ children, onClick, loading, variant = 'primary', ...props }) => {
  const baseStyles = 'w-full py-2 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${baseStyles} ${variants[variant]} disabled:cursor-not-allowed`}
      {...props}
    >
      {loading && <Loader2 className="h-5 w-5 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
