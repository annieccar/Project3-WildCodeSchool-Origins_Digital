import PropTypes, { shape } from "prop-types";
import interceptor from "../hooks/useInstanceWithInterceptor";

import CarouselManagementVideoList from "./CarouselManagementVideoList";
import popUpMessages from "../json/crslMngmtPopMsg.json";

function CarouselManagementAssign({
  videosList,
  currentCarousel,
  setCurrentCarousel,
  categoriesList,
  handlePopUpOpen,
  setCarouselPopUpMessage,
  hasVideoAssignmentChanged,
}) {
  const expressAPI = interceptor();

  const handleCarouselDeletion = (id) => {
    setCarouselPopUpMessage({
      ...popUpMessages.handleDeletionWarning,
      value: id,
    });
    handlePopUpOpen();
  };

  const saveChanges = () => {
    if (!hasVideoAssignmentChanged()) {
      setCarouselPopUpMessage(popUpMessages.saveChangesNoModif);
      return handlePopUpOpen();
    }
    if (currentCarousel.videosArray.length > 10) {
      setCarouselPopUpMessage(popUpMessages.handleCreateCarouselTooMuchVideos);
      return handlePopUpOpen();
    }

    const addedJointures = currentCarousel.videosArray.filter(
      (video) =>
        !currentCarousel.videosArrayRef.some(
          (videoRef) => videoRef.video_id === video.video_id
        )
    );
    const removedJointures = currentCarousel.videosArrayRef.filter(
      (videoRef) =>
        !currentCarousel.videosArray.some(
          (video) => video.video_id === videoRef.video_id
        )
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
              ...currentCarousel,
              videosArrayRef: [...currentCarousel.videosArray],
            });
            setCarouselPopUpMessage(popUpMessages.saveChangesSuccess);
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
              videosArrayRef: [...currentCarousel.videosArray],
            });
            setCarouselPopUpMessage(popUpMessages.saveChangesSuccess);
          }
        });
    }
    return handlePopUpOpen();
  };

  return (
    <div className="flex flex-col px-2 py-4 bg-almostWhite dark:bg-dark">
      <div className="flex flex-col items-center mt-5">
        <h3 className="font-bold text-xl text-orange self-center pb-4">{`Carousel selected: ${currentCarousel.title}`}</h3>
        <CarouselManagementVideoList
          videosList={videosList}
          currentCarousel={currentCarousel}
          setCurrentCarousel={setCurrentCarousel}
          categoriesList={categoriesList}
        />
        <div className="flex mt-8 mx-2">
          <button
            className="px-4 w-36 mx-2 lg:w-44 h-12 lg:mx-5 mb-3 rounded-3xl text-white font-semibold bg-orange-gradient"
            type="button"
            onClick={saveChanges}
          >
            {`Save changes on ${currentCarousel.title}`}
          </button>
          <button
            className="h-12 mx-2 w-36 lg:w-44 px-4 lg:mx-5 rounded-3xl text-white font-semibold bg-blue-gradient"
            type="button"
            onClick={() => handleCarouselDeletion(currentCarousel.carouselId)}
          >
            {`Delete ${currentCarousel.title}`}
          </button>
        </div>
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
    videosArray: PropTypes.arrayOf(
      shape({
        title: PropTypes.string,
        id: PropTypes.number,
        video_id: PropTypes.number.isRequired,
      })
    ).isRequired,
    videosArrayRef: PropTypes.arrayOf(
      shape({
        title: PropTypes.string,
        id: PropTypes.number,
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
  handlePopUpOpen: PropTypes.func.isRequired,
  setCarouselPopUpMessage: PropTypes.func.isRequired,
  hasVideoAssignmentChanged: PropTypes.func.isRequired,
};
