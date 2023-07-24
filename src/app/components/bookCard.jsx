import React from "react";

const BookCard = ({ book, isBookInReadingList, addToReadingList, removeFromReadingList, openModal }) => {
    return (
        <div className={`w-1/6 p-4 relative ${isBookInReadingList(book) ? "opacity-50 pointer-events-none" : ""}`}>
            <div className="hover:scale-110">
                <img
                    src={book.book.cover}
                    alt={book.book.title}
                    className={`w-full h-auto max-h-48 cursor-pointer shadow-customShadow rounded-t-xl ${isBookInReadingList(book) ? "darken" : ""}`}
                    onClick={() => openModal(book)}
                />
                <div className="flex w-full">
                    <button
                        onClick={() => (isBookInReadingList(book) ? removeFromReadingList(book) : addToReadingList(book))}
                        className="border border-customGreen bg-customGreen w-full hover:bg-white hover:text-customGreen rounded-b-xl"
                    >
                        {isBookInReadingList(book) ? "LEÍDO" : "AGREGAR"}
                    </button>
                </div>
            </div>
            {isBookInReadingList(book) && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xl">Read</span>
                </div>
            )}
        </div>
    );
};

export default BookCard;
