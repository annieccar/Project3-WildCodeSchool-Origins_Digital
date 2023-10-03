import React from "react";
import PropTypes from "prop-types";

export default function CategoryManagementList({
  categories,
  selectedCategory,
  handleCategoryClick,
}) {
  return (
    <div className="m-2 bg-almostWhite dark:bg-dark">
      <p className="mx-4 my-2 pb-2 font-semibold  text-orange">
        Categories list
      </p>
      <div className="flex flex-col border-solid border-2 border-lightBlue dark:border-orange w-48 px-5 py-3 rounded-md">
        {categories &&
          categories.map((category) => (
            <button
              className={`m-2 p-1 font-bold border-solid border-2 border-lightBlue dark:border-orange rounded-3xl ${
                category.id === selectedCategory.id &&
                "bg-[linear-gradient(90deg,_#FF8200_0%,_#FF2415_100%)] text-white border-orange"
              }`}
              type="button"
              key={category.id}
              onClick={(e) =>
                handleCategoryClick(e, category.name, category.id)
              }
            >
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </button>
          ))}
      </div>
    </div>
  );
}
CategoryManagementList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  selectedCategory: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
};
