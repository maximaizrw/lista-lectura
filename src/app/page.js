'use client'

import React, { useState, useEffect } from "react";
import booksData from "./data/books.json";
import Modal from "./components/Modal";

export default function Home() {
  // Datos de libros importados desde el archivo JSON
  const { library } = booksData;

  // Estados para la página
  const [readingList, setReadingList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [filteredBooks, setFilteredBooks] = useState(library);
  const [availableBooksCount, setAvailableBooksCount] = useState(library.length);

  // Función para filtrar libros por género
  const filterBooksByGenre = (genre) => {
    if (genre === "All") {
      setFilteredBooks(library);
    } else {
      const filtered = library.filter((book) => book.book.genre === genre);
      setFilteredBooks(filtered);
    }
  };

  useEffect(() => {
    filterBooksByGenre(selectedGenre);
    // Calculamos la cantidad de libros disponibles considerando los que están en la lista de lectura
    const filteredAvailableBooks = filteredBooks.filter(
      (book) => !readingList.includes(book)
    );
    setAvailableBooksCount(filteredAvailableBooks.length);
  }, [selectedGenre, readingList, filteredBooks]);

  // Función para agregar un libro a la lista de lectura
  const addToReadingList = (book) => {
    if (!readingList.includes(book)) {
      setReadingList([...readingList, book]);
      setAvailableBooksCount((prevCount) => prevCount - 1);
    }
  };

  // Función para eliminar un libro de la lista de lectura
  const removeFromReadingList = (book) => {
    const updatedList = readingList.filter((item) => item !== book);
    setReadingList(updatedList);
    setAvailableBooksCount((prevCount) => prevCount + 1);
  };

  // Función para verificar si un libro está en la lista de lectura
  const isBookInReadingList = (book) => {
    return readingList.includes(book);
  };

  // Funciones para manejar el modal
  const openModal = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };


  return (
    <main className="bg-white">
      <div className="flex p-8">
        <div className="w-3/4">
          <div className="px-4">
            <h2 className="text-[#5ABD8C] text-2xl">
              MIS LIBROS ({availableBooksCount})
            </h2>
          </div>

          {/* Dropdown para seleccionar género */}
          <div className="px-4 py-2 text-black">
            <label htmlFor="genreSelect" className="mr-2">
              Filtrar por género:
            </label>
            <select
              id="genreSelect"
              onChange={(e) => setSelectedGenre(e.target.value)}
              value={selectedGenre}
            >
              <option value="All">Todos</option>
              <option value="Fantasía">Fantasía</option>
              <option value="Ciencia ficción">Ciencia ficción</option>
              <option value="Terror">Terror</option>
              <option value="Zombies">Zombies</option>
            </select>
          </div>

          <div className="flex flex-wrap">
            {filteredBooks.map((book, index) => (
              <div key={index} className="w-1/6 p-4">
                <div
                  className={`relative ${isBookInReadingList(book)
                    ? "opacity-50 pointer-events-none"
                    : ""}`}
                >
                  <div className="hover:scale-110">
                    <img
                      src={book.book.cover}
                      alt={book.book.title}
                      className={`w-full h-auto max-h-48 cursor-pointer shadow-2xl rounded-t-xl ${isBookInReadingList(book) ? "darken" : ""
                        }`}
                      onClick={() => openModal(book)}
                    />
                    <div className="flex w-full">
                      <button
                        onClick={() =>
                          isBookInReadingList(book)
                            ? removeFromReadingList(book)
                            : addToReadingList(book)
                        }
                        className="border border-[#5ABD8C] bg-[#5ABD8C] w-full hover:bg-white hover:text-[#5ABD8C] rounded-b-xl"
                      >
                        AGREGAR
                      </button>
                    </div>
                  </div>
                  {isBookInReadingList(book) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-xl">Read</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {selectedBook && (
              <Modal
                book={selectedBook}
                isOpen={Boolean(selectedBook)}
                closeModal={closeModal}
              />
            )}
          </div>
        </div>

        <div className="w-1/4 border-l-2 border-zinc-400">
          <h2 className="text-[#5ABD8C] text-2xl px-4">
            LIBROS LEIDOS ({readingList.length})
          </h2>
          {readingList.length > 0 ? (
            <div className="flex flex-wrap">
              {readingList.map((book, index) => (
                <div key={index} className="w-1/2 p-4 relative">
                  <img
                    src={book.book.cover}
                    alt={book.book.title}
                    className="w-full h-48 object-contain"
                  />
                  <button
                    className="absolute top-0 right-0 bg-red-800 rounded-full h-6 w-6 p-1 flex items-center justify-center"
                    onClick={() => removeFromReadingList(book)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No books in the reading list.</p>
          )}
        </div>
      </div>
    </main>
  );
}
