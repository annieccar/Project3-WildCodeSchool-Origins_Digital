import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useInstanceWithInterceptor from "../hooks/useInstanceWithInterceptor";
import CategoryManagementCreate from "../components/CategoryManagementCreate";
import CategoryManagementList from "../components/CategoryManagementList";
import CategoryManagementVideoList from "../components/CategoryManagementVideoList";
import CustomModal from "../components/CustomModal";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    name: null,
    id: null,
  });
  const [selectedCategoryVideos, setSelectedCategoryVideos] = useState([]);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [selectedCategoryVideoIds, setSelectedCategoryVideoIds] = useState([]);
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState("");

  const expressAPI = useInstanceWithInterceptor();

  useEffect(() => {
    expressAPI
      .get(`/api/categories`)
      .then((response) => {
        setCategories(response.data);
        setSelectedCategory(response.data[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      expressAPI
        .get(`/api/videos`)
        .then((response) => {
          setSelectedCategoryVideos(response.data);
          setSelectedCategoryVideoIds(
            response.data
              .filter((video) => video.category_id === selectedCategory.id)
              .map((video) => video.id)
          );
        })
        .catch((err) => console.error(err));
    }
  }, [selectedCategory]);

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
          if (selectedCategory.id === categories[0].id) {
            setSelectedCategory(categories[1]);
          } else {
            setSelectedCategory(categories[0]);
          }
          setModal(true);
          setMsg("Your category has been successfully deleted");
        })
        .catch((err) => console.error(err));
    }
  };

  const handleCheckboxChange = (videoId) => {
    setSelectedCategoryVideoIds((prevSelectedVideoIds) => {
      if (prevSelectedVideoIds.includes(videoId)) {
        expressAPI.put("/api/videos/category", {
          id: videoId,
          categoryId: null,
        });
        return prevSelectedVideoIds.filter((id) => id !== videoId);
      }
      return [...prevSelectedVideoIds, videoId];
    });
  };

  const handleMoveVideos = () => {
    if (selectedCategory.id && selectedCategoryVideoIds.length > 0) {
      const videosToUpdate = selectedCategoryVideoIds.map((videoId) => ({
        id: videoId,
        categoryId: selectedCategory.id,
      }));
      const promisedVideos = videosToUpdate.map((video) =>
        expressAPI.put(`/api/videos/category`, video).catch((err) => {
          console.error(
            "Erreur lors de l'enregistrement des modifications :",
            err
          );
        })
      );

      Promise.all(promisedVideos).then(() => {
        expressAPI
          .get(`/api/videos`)
          .then((response) => {
            setSelectedCategoryVideos(response.data);
            setModal(true);
            setMsg("Category updated");
          })
          .catch((err) => console.error(err));
      });
    }
  };

  return (
    categories && (
      <div className="pb-20 lg:pb-8 bg-almostWhite dark:bg-dark">
        <div className="flex flex-col items-center px-2 pt-10 bg-almostWhite dark:bg-dark lg:flex-row lg:flex-wrap lg:items-st">
          <h3 className="font-bold text-xl text-orange self-center pb-4 my-3 lg:text-center lg:w-full">
            Categories management
          </h3>
          <button
            type="button"
            className="w-44 h-10 m-2 text-white font-bold rounded-3xl lg:absolute lg:top-5 lg:left-5 font-primary bg-[linear-gradient(90deg,_#FF8200_0%,_#FF2415_100%)]"
            onClick={openNewCategoryModal}
          >
            Create new category
          </button>
        </div>

        <div className="mx-10 flex flex-col items-center bg-almostWhite dark:bg-dark lg:flex-row lg:items-start">
          <CategoryManagementList
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryClick={handleCategoryClick}
          />

          <CategoryManagementVideoList
            selectedCategory={selectedCategory}
            selectedCategoryVideos={selectedCategoryVideos}
            selectedCategoryVideoIds={selectedCategoryVideoIds}
            handleCheckboxChange={handleCheckboxChange}
            handleMoveVideos={handleMoveVideos}
            handleDeleteCategory={handleDeleteCategory}
          />
        </div>

        <div className="bg-dark">
          <CategoryManagementCreate
            isOpen={isNewCategoryModalOpen}
            onClose={closeNewCategoryModal}
            onCategoryCreate={handleCategoryCreate}
          />
        </div>
        {modal &&
          createPortal(
            <CustomModal closeModal={() => setModal(false)} msg={msg} />,
            document.body
          )}
      </div>
    )
  );
}
