import React, { useEffect } from 'react';

const Modal = ({ isOpen, closeModal, book }) => {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.classList.add('modal-open'); // Agregar clase para deshabilitar el scroll del cuerpo de la página
    } else {
      document.body.classList.remove('modal-open'); // Remover clase para habilitar el scroll del cuerpo de la página
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.classList.remove('modal-open'); // Remover clase al desmontar el componente
    };
  }, [isOpen, closeModal]);

  if (!isOpen || !book) {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 z-50" /> {/* Fondo opaco que cubre toda la página */}
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg relative w-[600px] shadow-lg">
          <button
            className="absolute top-0 right-0 p-2 text-zinc-600 hover:text-zinc-800 rounded-full flex items-center justify-center"
            onClick={closeModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Contenido del modal */}
          <div className="flex">
            <img
              src={book.book.cover}
              alt={book.book.title}
              className="max-w-48 max-h-48 rounded-xl shadow-lg"
            />
            <div className="px-4">
              <h2 className="text-zinc-600 text-2xl font-bold">{book.book.title}</h2>
              <p className="text-zinc-500">{book.book.author.name}</p>
              <div className="pt-2">
                <div className="text-zinc-500 flex">
                  <p className="pr-2 font-bold">Género:</p>
                  <p>{book.book.genre}</p>
                </div>
                <div className="text-zinc-500 flex">
                  <p className="pr-2 font-bold">Año:</p>
                  <p>{book.book.year}</p>
                </div>
                <div className="text-zinc-500 flex">
                  <p className="pr-2 font-bold">Páginas:</p>
                  <p>{book.book.pages}</p>
                </div>
                <p className="text-zinc-400">{book.book.synopsis}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
