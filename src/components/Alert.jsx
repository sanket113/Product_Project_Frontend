import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Alert = ({ type, message }) => {
  const styles = {
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };
  const Icon = type === 'error' ? AlertCircle : CheckCircle;

  return (
    <div className={`p-4 rounded-lg border ${styles[type]} flex items-start gap-3 mb-4`}>
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default Alert;
