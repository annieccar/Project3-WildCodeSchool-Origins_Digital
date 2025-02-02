import { useEffect, useState } from "react";
import { useBlurredBackgroundContext } from "../contexts/BlurredBackgroundContext";
import useMediaQuery from "../hooks/useMediaQuery";
import interceptor from "../hooks/useInstanceWithInterceptor";

import CarouselManagementPopUp from "../components/CarouselManagementPopUp";
import CarouselManagementList from "../components/CarouselManagementList";
import CarouselManagementCreate from "../components/CarouselManagementCreate";
import CarouselManagementAssign from "../components/CarouselManagementAssign";
import arrowLeft from "../assets/images/arrow-left.svg";
import popUpMessages from "../json/crslMngmtPopMsg.json";

export default function CarouselManagement() {
  const { isBackgroundBlurred, setIsBackgroundBlurred } =
    useBlurredBackgroundContext();
  const expressAPI = interceptor();
  const [carouselPopUpOpen, setCarouselPopUpOpen] = useState(false);
  const [carouselPopUpMessage, setCarouselPopUpMessage] = useState({});
  const [carouselList, setCarouselList] = useState([]);
  const [videosList, setVideosList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [currentCarousel, setCurrentCarousel] = useState({
    carouselId: null,
    title: "",
    videosArray: [],
    videosArrayRef: [],
  });
  const [carouselManagementDisplay, setCarouselManagementDisplay] = useState(0);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handlePopUpOpen = () => {
    setCarouselPopUpOpen(true);
    setIsBackgroundBlurred(true);
  };

  const fetchNewCarousel = (id) => {
    expressAPI
      .get(`/api/carousels/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const fetchedVideosArray = res.data[0].video_id ? res.data : [];
          setCurrentCarousel({
            carouselId: id,
            title: res.data[0].title,
            videosArray: fetchedVideosArray,
            videosArrayRef: fetchedVideosArray,
          });
        } else {
          setCarouselPopUpMessage(popUpMessages.fetchCarouselFail);
          handlePopUpOpen();
        }
      })
      .catch((err) => console.error(err));

    setCarouselManagementDisplay(2);
  };

  useEffect(() => {
    expressAPI
      .get(`/api/carousels/`)
      .then((res) => setCarouselList(res.data))
      .catch((err) => console.error(err));
    expressAPI
      .get(`/api/videos/`)
      .then((res) => setVideosList(res.data))
      .catch((err) => console.error(err));
    expressAPI
      .get("api/categories/")
      .then((res) => setCategoriesList(res.data))
      .catch((err) => console.error(err));
  }, []);

  const resetCurrentCarouselThenDisplay = (displayNumber) => {
    setCurrentCarousel({
      carouselId: null,
      title: "",
      videosArray: [],
      videosArrayRef: [],
    });
    setCarouselManagementDisplay(displayNumber);
  };

  const hasVideoAssignmentChanged = () => {
    return (
      currentCarousel.videosArray.some(
        (video) =>
          !currentCarousel.videosArrayRef.some(
            (videoRef) => videoRef.video_id === video.video_id
          )
      ) ||
      currentCarousel.videosArrayRef.some(
        (videoRef) =>
          !currentCarousel.videosArray.some(
            (video) => video.video_id === videoRef.video_id
          )
      )
    );
  };

  const handleNewCarouselClick = () => {
    if (hasVideoAssignmentChanged()) {
      setCarouselPopUpMessage(popUpMessages.newCarouselClickWarning);
      return handlePopUpOpen();
    }
    return resetCurrentCarouselThenDisplay(1);
  };

  const handleBackToSelectionClick = () => {
    if (hasVideoAssignmentChanged()) {
      setCarouselPopUpMessage(popUpMessages.backToSelectionClickWarning);
      return handlePopUpOpen();
    }
    return resetCurrentCarouselThenDisplay(0);
  };

  const deleteCarousel = (id) => {
    expressAPI.delete(`/api/carousels/${id}`).then((res) => {
      if (res.status === 204) {
        setCarouselList([...carouselList.filter((el) => el.id !== id)]);
        resetCurrentCarouselThenDisplay(0);
        setCarouselPopUpMessage(popUpMessages.deleteSuccess);
        handlePopUpOpen();
      }
    });
  };

  const handleCloseModal = (status) => {
    setCarouselPopUpOpen(false);
    setIsBackgroundBlurred(false);
    if (status === "changeCarousel") {
      fetchNewCarousel(carouselPopUpMessage.value);
    }
    if (status === "deleteCarousel") {
      deleteCarousel(carouselPopUpMessage.value);
    }
    if (status === "backToSelection") {
      setCurrentCarousel({
        carouselId: null,
        title: "",
        videosArray: [],
        videosArrayRef: [],
      });
      setCarouselManagementDisplay(0);
    }
    if (status === "carouselCreation") {
      resetCurrentCarouselThenDisplay(1);
    }
    setCarouselPopUpMessage({});
  };

  return (
    <div className={` ${isBackgroundBlurred && "blur-sm"}`}>
      <div className="pb-16 lg:bp-0 bg-almostWhite dark:bg-dark">
        <div className="flex flex-col items-center px-2 py-1 bg-almostWhite dark:bg-dark">
          {carouselManagementDisplay === 0 && (
            <h2 className="font-bold text-xl text-orange self-center pb-4 my-3">
              Carousel management
            </h2>
          )}
          <div className="flex mt-3">
            {!isDesktop && carouselManagementDisplay !== 0 ? (
              <button
                type="button"
                onClick={handleBackToSelectionClick}
                className="flex items-center w-44 h-10 m-2 rounded-3xl font-primary leading-none border-2 border-orange  dark:bg-dark "
              >
                <div className="flex">
                  <img
                    src={arrowLeft}
                    alt="left arrow"
                    className="dark:text-white text-orange"
                  />
                  <p className="text-orange">Back to carousel selection</p>
                </div>
              </button>
            ) : (
              ""
            )}
            <button
              type="button"
              onClick={handleNewCarouselClick}
              className={`w-44 h-10 m-2 font-bold rounded-3xl lg:absolute lg:top-3 lg:left-5 text-white font-primary bg-[linear-gradient(90deg,_#FF8200_0%,_#FF2415_100%)] ${
                carouselManagementDisplay === 1 && "invisible"
              }`}
            >
              Create new carousel
            </button>
          </div>
        </div>
        <div
          className={`flex ${
            (isDesktop && carouselManagementDisplay === 2) ||
            (isDesktop && carouselManagementDisplay === 1)
              ? "justify-around"
              : "justify-start"
          } ${
            !isDesktop && "justify-center"
          } px-5  bg-almostWhite dark:bg-dark `}
        >
          {isDesktop || carouselManagementDisplay === 0 ? (
            <div
              className={`${
                (isDesktop && carouselManagementDisplay === 2) ||
                (isDesktop && carouselManagementDisplay === 1)
                  ? "mt-[4.3rem]"
                  : ""
              }`}
            >
              <CarouselManagementList
                carouselList={carouselList}
                currentCarousel={currentCarousel}
                handlePopUpOpen={handlePopUpOpen}
                setCarouselPopUpMessage={setCarouselPopUpMessage}
                fetchNewCarousel={fetchNewCarousel}
                hasVideoAssignmentChanged={hasVideoAssignmentChanged}
              />
            </div>
          ) : (
            ""
          )}

          <div className="flex flex-col justify-center lg:mx-auto bg-almostWhite dark:bg-dark">
            {carouselManagementDisplay === 1 && (
              <CarouselManagementCreate
                videosList={videosList}
                currentCarousel={currentCarousel}
                setCurrentCarousel={setCurrentCarousel}
                carouselList={carouselList}
                setCarouselList={setCarouselList}
                categoriesList={categoriesList}
                handlePopUpOpen={handlePopUpOpen}
                setCarouselPopUpMessage={setCarouselPopUpMessage}
                setCarouselManagementDisplay={setCarouselManagementDisplay}
              />
            )}
            {carouselManagementDisplay === 2 && (
              <CarouselManagementAssign
                videosList={videosList}
                currentCarousel={currentCarousel}
                setCurrentCarousel={setCurrentCarousel}
                categoriesList={categoriesList}
                handlePopUpOpen={handlePopUpOpen}
                setCarouselPopUpMessage={setCarouselPopUpMessage}
                hasVideoAssignmentChanged={hasVideoAssignmentChanged}
              />
            )}
            {carouselManagementDisplay === 0 && isDesktop ? (
              <h3 className="ml-8 mt-6 text-2xl text-lightBlue dark:text-white">
                Please select "Create new carousel" or select an existing
                carousel in the list.
              </h3>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {carouselPopUpOpen && (
        <CarouselManagementPopUp
          isOpen={carouselPopUpOpen}
          onClose={handleCloseModal}
          message={carouselPopUpMessage}
        />
      )}
    </div>
  );
}
