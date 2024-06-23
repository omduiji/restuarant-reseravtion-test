import React from 'react';
import Search from './searchInput';
import Dropdown from '../ui/dropdown';
import { SortKey } from '../utils/types';

interface ISearchOptions {
  label: string;
  value: SortKey;
}

interface IHeaderProps {
  handleSort: (value: SortKey) => void;
  handleSearch: (value: string) => void;
}

const Header: React.FC<IHeaderProps> = ({ handleSort, handleSearch }) => {
  const options: ISearchOptions[] = [
    { label: 'Username', value: 'guestName' },
    { label: 'Guest Number', value: 'guestNumber' },
    { label: 'Default', value: 'default' },
  ];
  const handleSearchChange = (value: string) => {
    handleSearch!(value);
  };

  return (
    <div className="flex align-center justify-between">
      <Search
        placeholder="Search reservations..."
        onSearch={handleSearchChange}
      />
      <Dropdown
        options={options}
        onSelect={(value) => handleSort(value as SortKey)}
      />
    </div>
  );
};

export default Header;
