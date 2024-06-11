import React from 'react';
import Search from './searchInput';
import Dropdown from '../ui/dropdown';

interface ISearch {}

const Header: React.FC<ISearch> = () => {
  const handleSearch = (value: string) => {
    console.log('Search term:', value);
  };
  const handleSelect = (value: string) => {
    console.log('Selected value:', value);
  };
  return (
    <div className="flex align-center justify-between">
      <Search placeholder="Search reservations..." onSearch={handleSearch} />
      <Dropdown
        options={['Option 1', 'Option 2', 'Option 3']}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default Header;
