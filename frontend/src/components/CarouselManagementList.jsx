import PropTypes, { shape } from "prop-types";
import { useBlurredBackgroundContext } from "../contexts/BlurredBackgroundContext";

function CarouselManagementList({
  currentCarousel,
  carouselList,
  setCarouselErrorPopUpOpen,
  setCarouselErrorMessage,
  fetchNewCarousel,
}) {
  const { setIsBackgroundBlurred } = useBlurredBackgroundContext();

  const handleCarouselError = () => {
    setCarouselErrorPopUpOpen(true);
    setIsBackgroundBlurred(true);
  };

  const handleCarouselSelected = (id) => {
    if (currentCarousel.modified.length > 0) {
      setCarouselErrorMessage({
        title: "Carousel has been modified",
        content:
          "You have unsaved modifications on this carousel. Would you like to discard them and proceed ?",
        button: {
          onValidation: "changeCarousel",
          text: "Confirm",
          value: id,
        },
      });
      handleCarouselError();
    } else {
      fetchNewCarousel(id);
    }
  };

  return (
    <div>
      <p>Carousels list</p>
      <div className="flex flex-col border-solid border-2 border-orange w-48 px-5 py-3 rounded-md">
        {carouselList.length > 0 &&
          carouselList.map((carousel) => (
            <button
              className={`border-solid border-1 border-orange ${
                carousel.id === currentCarousel.carouselId && "bg-orange"
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
  carouselList: PropTypes.arrayOf(
    shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  setCarouselErrorPopUpOpen: PropTypes.func.isRequired,
  setCarouselErrorMessage: PropTypes.func.isRequired,
  fetchNewCarousel: PropTypes.func.isRequired,
};
