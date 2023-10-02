import React, { useState } from "react";
import PropTypes from "prop-types";
import expressAPI from "../services/expressAPI";

export default function CategoryManagementCreate({
  isOpen,
  onClose,
  onCategoryCreate,
}) {
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleCreateCategory = () => {
    const newCategory = {
      name: newCategoryName,
    };

    expressAPI
      .post(`/api/categories`, newCategory)
      .then((response) => {
        onCategoryCreate(response.data);
        onClose();
        setNewCategoryName("");
      })
      .catch((err) => console.error(err));
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="relative inset-0 bg-gray-900 opacity-50"> </div>

        <div className="bg-lightBlue dark:bg-dark fixed left-1/2 top-[250px] transform -translate-x-1/2 -translate-y-1/2 p-4 w-96 rounded-lg shadow-xl">
          <h2 className=" text-xl font-bold text-white mb-4">
            Create New Category:
          </h2>

          <input
            type="text"
            placeholder="Category Name"
            className="border-2 rounded-full focus:outline-none p-2 w-full mb-2 text-white bg-lightBlue dark:bg-dark"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-orange-gradient text-white font-bold py-2 px-4 rounded-lg mr-2"
              onClick={handleCreateCategory}
            >
              Create
            </button>

            <button
              type="button"
              className="text-white font-bold bg-blue-gradient py-2 px-4 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
}
CategoryManagementCreate.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCategoryCreate: PropTypes.func.isRequired,
};
