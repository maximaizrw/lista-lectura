import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="px-4 py-2 text-black">
      <label htmlFor="searchInput" className="mr-2 text-zinc-600">
        Buscar por nombre:
      </label>
      <input
        type="text"
        id="searchInput"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-customGreen text-white border-1 border-black rounded px-2 py-1 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
