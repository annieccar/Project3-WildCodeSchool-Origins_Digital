import React, { useEffect, useState } from "react";
import expressAPI from "../services/expressAPI";
import CategoryManagementCreate from "../components/CategoryManagementCreate";
import CategoryManagementList from "../components/CategoryManagementList";
import CategoryManagementVideoList from "../components/CategoryManagementVideoList";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState({
    name: "",

    id: "",
  });
  const [selectedCategoryVideos, setSelectedCategoryVideos] = useState([]);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
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

  const handleCategoryCreate = (newCategory) => {
    setCategories([...categories, newCategory]);
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
      <div className="flex flex-col mx-2 pt-10  bg-dark">
        <h3 className="font-bold text-xl text-orange self-center pb-4 my-3">
          Categories management
        </h3>
        {/*  CategoryManagementList c' est bon */}

        <div className="flex min-h-screen md:h-[1700px] lg:h-[1200px] justify-center lg:justify-start bg-dark ">
          {/* Utilisez CategoryManagementList  */}
          <CategoryManagementList
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryClick={handleCategoryClick}
          />
          <div className="w-full ">
            <CategoryManagementVideoList
              selectedCategory={selectedCategory}
              selectedCategoryVideos={selectedCategoryVideos}
              selectedCategoryVideoIds={selectedCategoryVideoIds}
              handleCheckboxChange={handleCheckboxChange}
              handleMoveVideos={handleMoveVideos} // Transmettez la fonction de gestion
              handleDeleteCategory={handleDeleteCategory} // Transmettez la fonction de gestion
            />
          </div>
        </div>
        <div className="flex flex-wrap">
          <button
            type="button"
            className="w-44 h-10 m-2 rounded-3xl lg:absolute lg:top-5 lg:left-5 font-primary bg-[linear-gradient(90deg,_#FF8200_0%,_#FF2415_100%)]"
            onClick={openNewCategoryModal}
          >
            Create new category
          </button>{" "}
        </div>
      </div>
      <div className="flex min-h-screen md:h-[1700px] lg:h-[1200px] justify-center lg:justify-start bg-dark ">
        {/* Utilisez CategoryManagementCreate  */}
        <div className="bg-dark">
          <CategoryManagementCreate
            isOpen={isNewCategoryModalOpen}
            onClose={closeNewCategoryModal}
            onCategoryCreate={handleCategoryCreate}
          />
        </div>

        {/* Utilisez CategoryManagementVideoList  */}

        {/* <div className="left-[528px] top-[328px] absolute text-center text-white text-[32px] font-bold font-['Lato']">
        <span className="ml-8 mt-6 text-xl text-orange">
          Assign videos to this category:
        </span>

        <span>
          {selectedCategory && selectedCategory.name
            ? selectedCategory.name.charAt(0).toUpperCase() +
              selectedCategory.name.slice(1)
            : ""}
        </span>
          </div> */}
      </div>
    </div>
  );
}
