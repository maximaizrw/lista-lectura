'use client'

import React, { useState, useEffect } from "react";
import booksData from "./data/books.json";
import Modal from "./components/modal";
import BookCard from "./components/bookCard";
import BookFilter from "./components/bookFilter/bookFilter";
import ReadingList from "./components/readingList";

export default function Home() {
  // Datos de libros importados desde el archivo JSON
  const { library } = booksData;

  // Estados para la página
  const [readingList, setReadingList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [filteredBooks, setFilteredBooks] = useState(library);
  const [availableBooksCount, setAvailableBooksCount] = useState(library.length);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Cargar la lista de lectura desde el almacenamiento local al inicio
    const storedReadingList = localStorage.getItem("readingList");
    if (storedReadingList) {
      setReadingList(JSON.parse(storedReadingList));
    }

    // Agregar un listener para el evento "storage" que sincronice la lista de lectura
    window.addEventListener("storage", handleStorageChange);

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Filtrar libros cuando cambia el género o el término de búsqueda
    filterBooks(selectedGenre, searchTerm);
  }, [selectedGenre, searchTerm]);

  useEffect(() => {
    // Actualizar el estado de los libros con la propiedad "read" según su presencia en la lista de lectura
    const updatedLibrary = filteredBooks.map((book) => ({
      ...book,
      read: isBookInReadingList(book),
    }));
    setFilteredBooks(updatedLibrary);

    // Calculamos la cantidad de libros disponibles considerando los que están en la lista de lectura
    const filteredAvailableBooks = filteredBooks.filter((book) => !isBookInReadingList(book));
    setAvailableBooksCount(filteredAvailableBooks.length);
  }, [readingList, filteredBooks]);

  const handleStorageChange = (event) => {
    if (event.key === "readingList") {
      setReadingList(JSON.parse(event.newValue));
    }
  };

  const filterBooks = (genre, name) => {
    let filtered = library;

    // Filtrar por género si se seleccionó un género distinto de "All"
    if (genre !== "All") {
      filtered = filtered.filter((book) => book.book.genre === genre);
    }

    // Filtrar por nombre de libro
    filtered = filtered.filter((book) => book.book.title.toLowerCase().includes(name.toLowerCase()));

    setFilteredBooks(filtered);
  };

  const addToReadingList = (book) => {
    if (!readingList.some((item) => item.book.title === book.book.title)) {
      const updatedList = [...readingList, book];
      setReadingList(updatedList);
      setAvailableBooksCount((prevCount) => prevCount - 1);
      localStorage.setItem("readingList", JSON.stringify(updatedList));
    }
  };

  const removeFromReadingList = (book) => {
    const updatedList = readingList.filter((item) => item.book.title !== book.book.title);
    setReadingList(updatedList);
    setAvailableBooksCount((prevCount) => prevCount + 1);
    localStorage.setItem("readingList", JSON.stringify(updatedList));
  };

  const isBookInReadingList = (book) => {
    return readingList.some((item) => item.book.title === book.book.title);
  };

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
            <h2 className="text-customGreen text-2xl">
              MIS LIBROS ({availableBooksCount})
            </h2>
          </div>
          <BookFilter
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <div className="flex flex-wrap">
            {filteredBooks.map((book, index) => (
              <BookCard
                key={index}
                book={book}
                isBookInReadingList={isBookInReadingList}
                addToReadingList={addToReadingList}
                removeFromReadingList={removeFromReadingList}
                openModal={openModal}
              />
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
        <ReadingList
          readingList={readingList}
          removeFromReadingList={removeFromReadingList}
        />
      </div>
    </main>
  );
}
