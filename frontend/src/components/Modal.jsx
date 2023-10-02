import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function Modal({
  isOpen,
  hasCloseBtn = true,
  onClose,
  children,
}) {
  const [modalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef(null);

  /**
   * Function that sets to false the state which controls modal display.
   * If a function onClose has been passed in props, it will be expressed.
   */
  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  /**
   * Allows the user to close modal by pressing escape key.
   */
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (modalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [modalOpen]);

  return (
    <dialog
      className="bg-lightBlue dark:bg-dark text-almostWhite dark:text-white space-x-2 flex flex-col justify-around border-4 p-4 border-orange rounded-3xl font-primary"
      ref={modalRef}
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      <div className="flex flex-col justify-between items-center">
        {children}
        {hasCloseBtn && (
          <button
            type="button"
            onClick={handleCloseModal}
            className="h-10 w-36 mt-5 rounded-3xl text-orange font-semibold border-2 border-orange focus:outline-none"
          >
            Close
          </button>
        )}
      </div>
    </dialog>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hasCloseBtn: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Modal.defaultProps = {
  children: "",
};
