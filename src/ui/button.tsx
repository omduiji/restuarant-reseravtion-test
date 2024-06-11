import React from 'react';

interface IButtonProps {
  onClick: () => void;
  label: string;
}

const Button: React.FC<IButtonProps> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-main-purple text-white font-semibold rounded-r-full hover:bg-main-purple-shade focus:outline-none focus:ring-2 focus:ring-main-purple-shade focus:ring-opacity-50 h-12"
    >
      {label}
    </button>
  );
};

export default Button;
