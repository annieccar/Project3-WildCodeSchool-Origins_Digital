import PropTypes, { shape } from "prop-types";
import { useBlurredBackgroundContext } from "../contexts/BlurredBackgroundContext";
import expressAPI from "../services/expressAPI";
import CarouselManagementVideoList from "./CarouselManagementVideoList";

function CarouselManagementCreate({
  videosList,
  currentCarousel,
  setCurrentCarousel,
  carouselList,
  setCarouselList,
  categoriesList,
  setCarouselErrorPopUpOpen,
  setCarouselErrorMessage,
  setCarouselManagementDisplay,
}) {
  const { setIsBackgroundBlurred } = useBlurredBackgroundContext();

  const handleCarouselError = () => {
    setCarouselErrorPopUpOpen(true);
    setIsBackgroundBlurred(true);
  };

  const assignVideos = (createdCarouselId) => {
    if (currentCarousel.base.length > 10) {
      setCarouselErrorMessage({
        title: "Too much videos",
        content:
          "Number of videos assigned to a carousel can't exceed 10. Please modify video assignment.",
      });
      return handleCarouselError();
    }
    return expressAPI
      .post(`/api/carousels/jointure`, {
        carouselId: createdCarouselId,
        idAdded: currentCarousel.base,
      })
      .then((res) => {
        if (res.status === 200) {
          setCurrentCarousel({
            ...currentCarousel,
            modified: [],
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const createCarousel = () => {
    expressAPI
      .post(`/api/carousels/`, currentCarousel)
      .then((res) => {
        if (res.status === 200) {
          if (currentCarousel.base.length > 0) {
            assignVideos(res.data.insertId);
          }
          setCarouselList([
            ...carouselList,
            { id: res.data.insertId, title: currentCarousel.title },
          ]);
          setCurrentCarousel({
            ...currentCarousel,
            carouselId: res.data.insertId,
          });
          setCarouselErrorMessage({
            title: "Carousel created",
            content: `Carousel ${currentCarousel.title} has been created in the database.`,
          });
          handleCarouselError();
          setCarouselManagementDisplay(2);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setCarouselErrorMessage({
            title: "Duplicate carousel",
            content:
              "A carousel with this name is already present in the database.",
          });
        } else {
          setCarouselErrorMessage({
            title: "Database error",
            content:
              "Error during database writing: the new carousel could not be saved.",
          });
        }
        return handleCarouselError();
      });
  };

  const handleCreateCarousel = () => {
    if (!currentCarousel.title) {
      setCarouselErrorMessage({
        title: "Creation error",
        content: "You must choose a name for the new carousel.",
      });
      return handleCarouselError();
    }

    return createCarousel();
  };

  return (
    <div className="flex w-full h-full flex-col flex-grow px-2 pb-4 bg-dark">
      <h2 className="font-bold text-xl text-orange self-center pb-4">
        Create new carousel
      </h2>
      <div className="flex max-h-10 flex-col">
        <div className="flex flex-wrap items-center m-2">
          <p className="px-3 py-1">New carousel name : </p>
          <input
            className="max-h-9 w-52 font-primary text-base p-2 border-2 bg-dark lg:border-2 border-orange rounded-md focus:outline-none "
            type="text"
            name="newCarouselName"
            id="newCarouselName"
            placeholder="Enter carousel name"
            value={currentCarousel.title}
            onChange={(e) =>
              setCurrentCarousel({ ...currentCarousel, title: e.target.value })
            }
          />
        </div>
        <CarouselManagementVideoList
          videosList={videosList}
          currentCarousel={currentCarousel}
          setCurrentCarousel={setCurrentCarousel}
          categoriesList={categoriesList}
        />
        <div className=" pb-24">
          <button
            className="w-48 h-14 py-3 mx-20 mt-5 rounded-3xl font-semibold bg-[linear-gradient(90deg,_#FF8200_0%,_#FF2415_100%)]"
            type="button"
            onClick={handleCreateCarousel}
          >
            Create new carousel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarouselManagementCreate;

CarouselManagementCreate.propTypes = {
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
  carouselList: PropTypes.arrayOf(
    shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  setCarouselList: PropTypes.func.isRequired,
  categoriesList: PropTypes.arrayOf(
    shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setCarouselErrorPopUpOpen: PropTypes.func.isRequired,
  setCarouselErrorMessage: PropTypes.func.isRequired,
  setCarouselManagementDisplay: PropTypes.func.isRequired,
};
