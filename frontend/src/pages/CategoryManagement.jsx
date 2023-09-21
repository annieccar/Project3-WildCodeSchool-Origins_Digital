import React, { useEffect, useState } from "react";

import expressAPI from "../services/expressAPI";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "",
    id: "",
  });
  const [selectedCategoryVideos, setSelectedCategoryVideos] = useState([]);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategoryVideoIds, setSelectedCategoryVideoIds] = useState([]);
  const [selectedNewCategoryId, setSelectedNewCategoryId] = useState(null);

  useEffect(() => {
    expressAPI
      .get(`/api/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    expressAPI
      .get(`/api/videos`)
      .then((response) => {
        setSelectedCategoryVideos(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCategoryClick = (e, categoryName, categoryId) => {
    e.preventDefault();

    setSelectedCategory({ name: categoryName, id: categoryId });

    const videosForSelectedCategory = selectedCategoryVideos
      .filter((video) => video.category_id === categoryId)
      .map((video) => video.id);

    setSelectedCategoryVideoIds(videosForSelectedCategory);
  };

  const openNewCategoryModal = () => {
    setIsNewCategoryModalOpen(true);
  };

  const closeNewCategoryModal = () => {
    setIsNewCategoryModalOpen(false);
  };

  const handleCreateCategory = () => {
    const newCategory = {
      name: newCategoryName,
    };

    expressAPI
      .post(`/api/categories`, newCategory)
      .then((response) => {
        setCategories([...categories, response.data]);
        closeNewCategoryModal();
        setNewCategoryName("");
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteCategory = () => {
    if (selectedCategory.id) {
      expressAPI
        .delete(`/api/categories/${selectedCategory.id}`)
        .then(() => {
          setCategories(
            categories.filter((category) => category.id !== selectedCategory.id)
          );
          setSelectedCategory({ name: "", id: "" });
        })
        .catch((err) => console.error(err));
    }
  };
  const handleCheckboxChange = (videoId) => {
    setSelectedCategoryVideoIds((prevSelectedVideoIds) => {
      if (prevSelectedVideoIds.includes(videoId)) {
        return prevSelectedVideoIds.filter((id) => id !== videoId);
      }
      return [...prevSelectedVideoIds, videoId];
    });
  };
  const handleMoveVideos = () => {
    if (
      selectedCategory.id &&
      selectedCategoryVideoIds.length > 0 &&
      selectedNewCategoryId
    ) {
      const videosToUpdate = selectedCategoryVideoIds.map((videoId) => ({
        id: videoId,
        category_id: selectedNewCategoryId, // Nouvelle catégorie
      }));

      expressAPI
        .put(`/api/videos`, videosToUpdate)
        .then(() => {
          setSelectedCategoryVideoIds([]);
          setSelectedNewCategoryId(null); // Réinitialiser la nouvelle catégorie sélectionnée

          expressAPI
            .get(`/api/videos`)
            .then((response) => {
              setSelectedCategoryVideos(response.data);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          console.error(
            "Erreur lors de l'enregistrement des modifications :",
            err
          );
        });
    }
  };

  return (
    <div>
      <div className="w-full h-full bg-slate-950">
        <div className="sm:w-96 h-[709px] sm:left-[118px] sm:top-[256px] absolute">
          <div className="w-full sm:w-[154px] h-7 left-0 sm:top-[133.43px] absolute text-center text-orange text-xl font-bold font-['Lato']">
            Categories list
          </div>

          <div className="w-full sm:w-80 h-[507.55px] left-[2px] sm:top-[201.45px] absolute bg-slate-950 rounded-[30px] border-2 border-orange" />

          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              className={`w-full sm:w-52 h-8 left-[61px] top-[256.39px] absolute text-center text-neutral-100 text-base font-bold font-['Lato']} ${
                category.id === selectedCategory.id
                  ? "border-orange border-solid border-2"
                  : ""
              }`}
              style={{ top: `${categories.indexOf(category) * 40 + 284}px` }}
              onClick={(e) =>
                handleCategoryClick(e, category.name, category.id)
              }
            >
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </button>
          ))}
        </div>

        <div className="sm:w-56 h-6 left-[550px] top-[231px] absolute text-center text-neutral-100 text-base font-bold font-['Lato']">
          <button
            type="button"
            className="border-solid w-full sm:w-72 h-12 rounded-[50px] bg-orange"
            onClick={openNewCategoryModal}
          >
            Create new category
          </button>
        </div>

        {/* Fenêtre modale pour créer une nouvelle catégorie */}

        {isNewCategoryModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900 opacity-50"> </div>

            <div className="relative bg-white p-4 w-96 rounded-lg shadow-xl">
              <h2 className="text-xl font-bold text-black mb-4">
                Create New Category:
              </h2>

              <input
                type="text"
                placeholder="Category Name"
                className="border p-2 w-full mb-2 text-black"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-orange text-black py-2 px-4 rounded-lg mr-2"
                  onClick={handleCreateCategory}
                >
                  Create
                </button>

                <button
                  type="button"
                  className="text-black py-2 px-4 rounded-lg border border-gray-300"
                  onClick={closeNewCategoryModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="left-[495px] top-[124px] absolute text-center text-orange text-[32px] font-bold font-['Lato']">
          Categories management
        </div>

        <div className="w-full sm:w-[849px] h-[584px] left-[495px] border-solid border-2 border-orange rounded-2xl top-[400px] absolute overflow-y-auto">
          <div className="mt-8 grid grid-cols-3 gap-4">
            {selectedCategoryVideos.map((video) => (
              <div
                key={video.id}
                className="mb-2 text-center text-neutral-100 pl-6 text-lg"
              >
                <input
                  className="mr-2"
                  type="checkbox"
                  checked={selectedCategoryVideoIds.includes(video.id)}
                  onChange={() => handleCheckboxChange(video.id)}
                />
                {video.name}
              </div>
            ))}
          </div>
        </div>

        <div className="sm:w-56 h-6 left-[622px] top-[1063px] absolute text-center text-neutral-100 text-xl font-bold font-['Lato']">
          <button
            type="button"
            className="bg-orange rounded-[50px] w-full sm:w-[302px] h-[50px]"
            onClick={handleMoveVideos}
          >
            Save Changes
          </button>
        </div>

        <div className="sm:left-[1054px] top-[1063px] absolute text-center text-white text-xl font-bold font-['Lato']">
          <button
            type="button"
            className="w-full sm:w-80 h-12 absolute bg-red rounded-[50px]"
            onClick={handleDeleteCategory}
          >
            Delete this category
          </button>
        </div>

        <div className="left-[528px] top-[328px] absolute text-center text-white text-[32px] font-bold font-['Lato']">
          <span className="ml-4 text-orange font-bold m-1">
            Assign videos to this category:
          </span>

          <span>
            {selectedCategory && selectedCategory.name
              ? selectedCategory.name.charAt(0).toUpperCase() +
                selectedCategory.name.slice(1)
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
