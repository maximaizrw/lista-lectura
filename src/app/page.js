'use client'

import React, { useState, useEffect, useCallback } from "react";
import booksData from "./data/books.json";
import BookList from "./components/BookList";
import ReadingList from "./components/ReadingList";
import Modal from "./components/Modal";
import SearchBar from "./components/SearchBar";


const { library } = booksData;

const Home = () => {
  const [readingList, setReadingList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [filteredBooks, setFilteredBooks] = useState(library);
  const [searchTerm, setSearchTerm] = useState("");

  const filterBooksByName = useCallback((term) => {
    const filtered = library.filter((book) =>
      book.book.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, []);


  // Función para filtrar libros por género
  const filterBooksByGenre = useCallback((genre) => {
    if (genre === "All") {
      setFilteredBooks(library);
    } else {
      const filtered = library.filter((book) => book.book.genre === genre);
      setFilteredBooks(filtered);
    }
  }, []);

  useEffect(() => {
    const storedReadingList = localStorage.getItem("readingList");
    if (storedReadingList) {
      setReadingList(JSON.parse(storedReadingList));
    }

    // Agregar un listener para el evento "storage" que sincronice la lista de lectura
    const handleStorageChange = (event) => {
      if (event.key === "readingList") {
        setReadingList(JSON.parse(event.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Función para agregar un libro a la lista de lectura
  const addToReadingList = (book) => {
    if (!readingList.some((item) => item.book.title === book.book.title)) {
      const updatedList = [...readingList, book];
      setReadingList(updatedList);
      // Guardar la lista de lectura actualizada en el localStorage.
      localStorage.setItem("readingList", JSON.stringify(updatedList));
    }
  };

  // Función para eliminar un libro de la lista de lectura
  const removeFromReadingList = (book) => {
    const updatedList = readingList.filter(
      (item) => item.book.title !== book.book.title
    );
    setReadingList(updatedList);
    // Guardar la lista de lectura actualizada en el localStorage.
    localStorage.setItem("readingList", JSON.stringify(updatedList));
  };

  // Funciones para manejar el modal
  const openModal = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  useEffect(() => {
    filterBooksByGenre(selectedGenre);
  }, [selectedGenre, filterBooksByGenre]);

  useEffect(() => {
    filterBooksByName(searchTerm);
  }, [searchTerm, filterBooksByName]);

  useEffect(() => {
    const updatedLibrary = filteredBooks.map((book) => ({
      ...book,
      read: readingList.some((item) => item.book.title === book.book.title),
    }));
    setFilteredBooks(updatedLibrary);
  }, [readingList, filteredBooks]);




  return (
    <main className="bg-white min-h-screen relative">
      <div className="flex p-8">
        <div className="w-3/4">
          <div className="px-4">
            <h2 className="text-customGreen text-2xl">
              MIS LIBROS ({filteredBooks.length})
            </h2>
          </div>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {/* Dropdown para seleccionar género */}
          <div className="px-4 py-2 text-black">
            <label htmlFor="genreSelect" className="mr-2 text-zinc-600">
              Filtrar por género:
            </label>
            <select
              id="genreSelect"
              onChange={(e) => setSelectedGenre(e.target.value)}
              value={selectedGenre}
              className="bg-customGreen text-white border-1 border-black rounded px-2 py-1 focus:outline-none"
            >
              <option value="All">Todos</option>
              <option value="Fantasía">Fantasía</option>
              <option value="Ciencia ficción">Ciencia ficción</option>
              <option value="Terror">Terror</option>
              <option value="Zombies">Zombies</option>
            </select>
          </div>

          <BookList
            books={filteredBooks}
            readingList={readingList}
            addToReadingList={addToReadingList}
            openModal={openModal}
          />

          {selectedBook && (
            <Modal
              book={selectedBook}
              isOpen={Boolean(selectedBook)}
              closeModal={closeModal}
            />
          )}
        </div>

        <div className="w-1/4 border-l-2 border-zinc-400">
          <ReadingList
            readingList={readingList}
            removeFromReadingList={removeFromReadingList}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
