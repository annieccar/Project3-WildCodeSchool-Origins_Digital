import PropTypes, { shape } from "prop-types";
import { useBlurredBackgroundContext } from "../contexts/BlurredBackgroundContext";
import expressAPI from "../services/expressAPI";
import CarouselManagementVideoList from "./CarouselManagementVideoList";

function CarouselManagementAssign({
  videosList,
  currentCarousel,
  setCurrentCarousel,
  categoriesList,
  setCarouselErrorPopUpOpen,
  setCarouselErrorMessage,
}) {
  const { setIsBackgroundBlurred } = useBlurredBackgroundContext();

  const handleCarouselError = () => {
    setCarouselErrorPopUpOpen(true);
    setIsBackgroundBlurred(true);
  };

  const handleCarouselDeletion = (id) => {
    setCarouselErrorMessage({
      title: "Deletion warning",
      content:
        "You are about to delete this carousel permanently. Do you want to continue ?",
      button: { onValidation: "deleteCarousel", text: "Confirm", value: id },
    });
    handleCarouselError();
  };

  const saveChanges = () => {
    if (currentCarousel.modified.length === 0) {
      setCarouselErrorMessage({
        title: "Modification error",
        content: "No modifications to be saved.",
      });
      return handleCarouselError();
    }
    if (currentCarousel.base.length > 10) {
      setCarouselErrorMessage({
        title: "Too much videos",
        content:
          "Number of videos assigned to a carousel can't exceed 10. Please modify video assignment.",
      });
      return handleCarouselError();
    }
    const addedJointures = currentCarousel.modified.filter(
      (el) => el.mod === "added"
    );
    const removedJointures = currentCarousel.modified.filter(
      (el) => el.mod === "removed"
    );
    if (addedJointures.length > 0) {
      expressAPI
        .post(`/api/carousels/jointure`, {
          carouselId: currentCarousel.carouselId,
          idAdded: addedJointures,
        })
        .then((res) => {
          if (res.status === 200) {
            setCurrentCarousel({
              carouselId: currentCarousel.carouselId,
              title: currentCarousel.title,
              base: currentCarousel.base,
              modified: [],
            });
            setCarouselErrorMessage({
              title: "Carousel modified",
              content: "Video assignment updated.",
            });
          }
        });
    }
    if (removedJointures.length > 0) {
      expressAPI
        .delete(`/api/carousels/jointure`, {
          data: {
            carouselId: currentCarousel.carouselId,
            idRemoved: removedJointures,
          },
        })
        .then((res) => {
          if (res.status === 204) {
            setCurrentCarousel({
              ...currentCarousel,
              modified: [],
            });
            setCarouselErrorMessage({
              title: "Carousel modified",
              content: "Video assignment updated.",
            });
          }
        });
    }
    return handleCarouselError();
  };

  return (
    <div className="flex w-full flex-col px-2 py-4 bg-almostWhite dark:bg-dark">
      <h3 className="font-bold text-xl text-orange self-center pb-4">{`Carousel selected: ${currentCarousel.title}`}</h3>
      <CarouselManagementVideoList
        videosList={videosList}
        currentCarousel={currentCarousel}
        setCurrentCarousel={setCurrentCarousel}
        categoriesList={categoriesList}
      />
      <div className="flex flex-wrap my-8">
        <button
          className="flex flex-col w-48 h-12 mx-5 mb-3 rounded-3xl text-white font-semibold bg-[linear-gradient(90deg,_#FF8200_0%,_#FF2415_100%)]"
          type="button"
          onClick={saveChanges}
        >
          {`Save changes on ${currentCarousel.title}`}
        </button>
        <button
          className="w-48 h-12 mx-5 rounded-3xl text-orange font-semibold border-2 border-orange"
          type="button"
          onClick={() => handleCarouselDeletion(currentCarousel.carouselId)}
        >
          {`Delete ${currentCarousel.title}`}
        </button>
      </div>
    </div>
  );
}

export default CarouselManagementAssign;

CarouselManagementAssign.propTypes = {
  videosList: PropTypes.arrayOf(
    shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      file_name: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
      category_id: PropTypes.number.isRequired,
    })
  ).isRequired,
  currentCarousel: PropTypes.shape({
    carouselId: PropTypes.number,
    title: PropTypes.string.isRequired,
    base: PropTypes.arrayOf(
      shape({
        title: PropTypes.string,
        id: PropTypes.number,
        video_id: PropTypes.number.isRequired,
      })
    ).isRequired,
    modified: PropTypes.arrayOf(
      shape({
        mod: PropTypes.string.isRequired,
        video_id: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setCurrentCarousel: PropTypes.func.isRequired,
  categoriesList: PropTypes.arrayOf(
    shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setCarouselErrorPopUpOpen: PropTypes.func.isRequired,
  setCarouselErrorMessage: PropTypes.func.isRequired,
};
