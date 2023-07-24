import React, { useCallback } from "react";

const SearchInput = React.memo(({ searchTerm, setSearchTerm }) => {
  const handleChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);

  return (
    <div className="px-4 py-2 text-black">
      <label htmlFor="searchInput" className="mr-2">
        Buscar por nombre:
      </label>
      <input
        type="text"
        id="searchInput"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Escribe el nombre del libro..."
        className="border border-customGreen rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-customGreen"
      />
    </div>
  );
});

export default SearchInput;
