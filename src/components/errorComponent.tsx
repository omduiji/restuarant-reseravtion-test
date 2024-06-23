import React from 'react';

interface ErrorComponentProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  return (
    <div className="max-w-lg m-auto p-4 border border-red-400 rounded shadow-lg bg-white w-full">
      <p className="text-red-600 font-bold">{message}</p>
    </div>
  );
};

export default ErrorComponent;
