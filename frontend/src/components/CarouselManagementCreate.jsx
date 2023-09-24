import PropTypes, { shape } from "prop-types";
import expressAPI from "../services/expressAPI";
import CarouselManagementVideoList from "./CarouselManagementVideoList";
import popUpMessages from "../json/crslMngmtPopMsg.json";

function CarouselManagementCreate({
  videosList,
  currentCarousel,
  setCurrentCarousel,
  carouselList,
  setCarouselList,
  categoriesList,
  handlePopUpOpen,
  setCarouselPopUpMessage,
  setCarouselManagementDisplay,
}) {
  const assignVideos = (createdCarouselId) => {
    expressAPI
      .post(`/api/carousels/jointure`, {
        carouselId: createdCarouselId,
        idAdded: currentCarousel.videosArray,
      })
      .then((res) => {
        if (res.status === 200) {
          setCurrentCarousel({
            ...currentCarousel,
            carouselId: createdCarouselId,
            videosArrayRef: [...currentCarousel.videosArray],
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
          if (currentCarousel.videosArray.length > 0) {
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
          setCarouselPopUpMessage({
            title: popUpMessages.createCarouselSuccess.title,
            content: `Carousel ${currentCarousel.title} ${popUpMessages.createCarouselSuccess.content}`,
          });
          handlePopUpOpen();
          setCarouselManagementDisplay(2);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setCarouselPopUpMessage(popUpMessages.createCarouselDuplicate);
        } else {
          setCarouselPopUpMessage(popUpMessages.createCarouselDbFail);
        }
        return handlePopUpOpen();
      });
  };

  const handleCreateCarousel = () => {
    if (!currentCarousel.title) {
      setCarouselPopUpMessage(popUpMessages.handleCreateCarouselNoTitle);
      return handlePopUpOpen();
    }
    if (currentCarousel.videosArray.length > 10) {
      setCarouselPopUpMessage(popUpMessages.handleCreateCarouselTooMuchVideos);
      return handlePopUpOpen();
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
        <div className=" pb-24 bg-dark">
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
  handlePopUpOpen: PropTypes.func.isRequired,
  setCarouselPopUpMessage: PropTypes.func.isRequired,
  setCarouselManagementDisplay: PropTypes.func.isRequired,
};
