import React from "react";

const BookList = ({ books, readingList, addToReadingList, openModal }) => {
  return (
    <div className="flex flex-wrap">
      {books.map((book, index) => (
        <div key={index} className="w-1/6 p-4">
          <div
            className={`relative ${readingList.some(
              (item) => item.book.title === book.book.title
            )
              ? "opacity-50 pointer-events-none"
              : ""}`}
          >
            <div className="hover:scale-110">
              <img
                src={book.book.cover}
                alt={book.book.title}
                className={`w-full h-auto max-h-48 cursor-pointer shadow-customShadow rounded-t-xl ${
                  readingList.some((item) => item.book.title === book.book.title)
                    ? "darken"
                    : ""
                }`}
                onClick={() => openModal(book)}
              />
              <div className="flex w-full">
                <button
                  onClick={() =>
                    readingList.some((item) => item.book.title === book.book.title)
                      ? removeFromReadingList(book)
                      : addToReadingList(book)
                  }
                  className="border border-customGreen bg-customGreen w-full hover:bg-white hover:text-customGreen rounded-b-xl"
                >
                  {readingList.some((item) => item.book.title === book.book.title)
                    ? "LEIDO"
                    : "AGREGAR"}
                </button>
              </div>
            </div>
            {readingList.some((item) => item.book.title === book.book.title) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xl">Read</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
