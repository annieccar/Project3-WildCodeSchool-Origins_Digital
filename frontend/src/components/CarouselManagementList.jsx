import PropTypes, { shape } from "prop-types";
import popUpMessages from "../json/crslMngmtPopMsg.json";

function CarouselManagementList({
  currentCarousel,
  carouselList,
  handlePopUpOpen,
  setCarouselPopUpMessage,
  fetchNewCarousel,
  hasVideoAssignmentChanged,
}) {
  const handleCarouselSelected = (id) => {
    if (hasVideoAssignmentChanged()) {
      setCarouselPopUpMessage({
        ...popUpMessages.carouselSelectedWarning,
        value: id,
      });
      return handlePopUpOpen();
    }

    return fetchNewCarousel(id);
  };

  return (
    <div className="m-2 bg-almostWhite dark:bg-dark">
      <p className="mx-4 my-2 pb-2 font-semibold  text-orange">
        Carousels list
      </p>
      <div className="flex flex-col border-solid border-2 border-lightBlue dark:border-orange w-48 px-5 py-3 rounded-md">
        {carouselList.length > 0 &&
          carouselList.map((carousel) => (
            <button
              className={`m-2 p-1 font-bold border-solid border-2 border-lightBlue dark:border-orange rounded-3xl ${
                carousel.id === currentCarousel.carouselId &&
                "bg-[linear-gradient(90deg,_#FF8200_0%,_#FF2415_100%)] border-orange text-white"
              }`}
              type="button"
              key={carousel.id}
              onClick={() => handleCarouselSelected(carousel.id)}
            >
              {carousel.title}
            </button>
          ))}
      </div>
    </div>
  );
}

export default CarouselManagementList;

CarouselManagementList.propTypes = {
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
  carouselList: PropTypes.arrayOf(
    shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  handlePopUpOpen: PropTypes.func.isRequired,
  setCarouselPopUpMessage: PropTypes.func.isRequired,
  fetchNewCarousel: PropTypes.func.isRequired,
  hasVideoAssignmentChanged: PropTypes.func.isRequired,
};
