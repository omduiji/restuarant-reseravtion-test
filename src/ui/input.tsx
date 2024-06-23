import React from 'react';

interface IInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInputProps> = ({
  value,
  onChange,
  placeholder,
  onKeyDown,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  };
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
      className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-main-purple h-12"
    />
  );
};

export default Input;
