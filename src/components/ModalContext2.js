// ModalContext.js
import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal2 = () => useContext(ModalContext);

const ModalProvider2 = ({ children }) => {
  const [isModalOpen2, setModalOpen] = useState(false);

  const toggleModal2 = () => setModalOpen((prev) => !prev);

  return (
    <ModalContext.Provider value={{ isModalOpen2, toggleModal2 }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider2;