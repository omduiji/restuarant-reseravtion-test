import React from 'react';
import Input from '../ui/input';
import Button from '../ui/button';

interface ISearchProps {
  placeholder: string;
  onSearch: (value: string) => void;
}

const Search: React.FC<ISearchProps> = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center basis-3/4">
      <Input
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        onKeyDown={handleKeyPress}
      />
      <Button onClick={handleSearch} label="Search" />
    </div>
  );
};

export default Search;
