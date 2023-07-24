import React from "react";

const ReadingList = ({ readingList, removeFromReadingList }) => {
  return (
    <div className="w-1/4 border-l-2 border-zinc-400">
      <h2 className="text-customGreen text-2xl px-4">
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
  );
};

export default ReadingList;
