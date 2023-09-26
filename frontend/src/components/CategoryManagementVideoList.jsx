import React from "react";
import PropTypes from "prop-types";

export default function CategoryManagementVideoList({
  selectedCategory,
  selectedCategoryVideos,
  selectedCategoryVideoIds,
  handleCheckboxChange,
  handleMoveVideos,
  handleDeleteCategory,
}) {
  return (
    <div className="bg-almostWhite dark:bg-dark h-screen ">
      <h3 className="mx-8 my-4 font-semibold text-orange">
        Assign videos to this category:
        <span className="text-lightBlue dark:text-white ml-4">
          {selectedCategory && selectedCategory.name
            ? selectedCategory.name.charAt(0).toUpperCase() +
              selectedCategory.name.slice(1)
            : ""}
        </span>
      </h3>

      <div className="flex flex-col  w-full max-w-[1200px] border-solid border-2 border-orange px-5 py-3 rounded-md">
        <div className="mt-8 grid grid-cols-3 gap-4">
          {selectedCategoryVideos.map((video) => (
            <div
              key={video.id}
              className="mb-2 h-4 text-center  text-neutral-100 pl-6 text-lg"
            >
              <input
                className="mr-2 accent-orange rounded-md focus:ring-orange  focus:ring-2 "
                type="checkbox"
                checked={selectedCategoryVideoIds.includes(video.id)}
                onChange={() => handleCheckboxChange(video.id)}
              />
              {video.name}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <button
            type="button"
            className="w-48 text-white bg-orange-gradient font-bold rounded-[50px] mr-6 h-[50px]"
            onClick={handleMoveVideos}
          >
            Save Changes
          </button>
          <button
            type="button"
            className="w-48 text-white font-bold h-12 bg-blue-gradient rounded-[50px]"
            onClick={handleDeleteCategory}
          >
            Delete this category
          </button>
        </div>
      </div>
    </div>
  );
}

CategoryManagementVideoList.propTypes = {
  selectedCategory: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  selectedCategoryVideos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCategoryVideoIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handleMoveVideos: PropTypes.func.isRequired,
  handleDeleteCategory: PropTypes.func.isRequired,
};
