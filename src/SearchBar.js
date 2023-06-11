import React from 'react';

const SearchBar = (change) => {
  return (
    <form>
      <input type="text" onChange={change} placeholder="Search..." />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;