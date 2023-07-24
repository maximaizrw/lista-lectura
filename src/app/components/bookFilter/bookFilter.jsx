import React from "react";
import SearchInput from "./SearchInput";
import GenreSelect from "./GenreSelect";

const BookFilter = React.memo(({ selectedGenre, setSelectedGenre, searchTerm, setSearchTerm }) => {
  return (
    <>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <GenreSelect selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
    </>
  );
});

export default BookFilter;
