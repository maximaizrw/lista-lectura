import React from "react";

const GenreSelect = React.memo(({ selectedGenre, setSelectedGenre }) => {
  const handleChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <div className="px-4 py-2 text-black">
      <label htmlFor="genreSelect" className="mr-2 text-zinc-600">
        Filtrar por género:
      </label>
      <select
        id="genreSelect"
        onChange={handleChange}
        value={selectedGenre}
        className="bg-customGreen text-white border-1 border-black rounded px-2 py-1 focus:outline-none"
      >
        <option value="All" key="all">
          Todos
        </option>
        <option value="Fantasía" key="fantasy">
          Fantasía
        </option>
        <option value="Ciencia ficción" key="scifi">
          Ciencia ficción
        </option>
        <option value="Terror" key="horror">
          Terror
        </option>
        <option value="Zombies" key="zombies">
          Zombies
        </option>
      </select>
    </div>
  );
});

export default GenreSelect;
