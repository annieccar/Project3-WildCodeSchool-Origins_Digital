import { useEffect, useState } from "react";
import { useBlurredBackgroundContext } from "../contexts/BlurredBackgroundContext";
import useMediaQuery from "../hooks/useMediaQuery";
import expressAPI from "../services/expressAPI";
import CarouselErrorPopUp from "../components/CarouselErrorPopUp";
import CarouselManagementList from "../components/CarouselManagementList";
import CarouselManagementCreate from "../components/CarouselManagementCreate";
import CarouselManagementAssign from "../components/CarouselManagementAssign";
import arrowLeft from "../assets/images/arrow-left.svg";

export default function CarouselManagement() {
  const { isBackgroundBlurred, setIsBackgroundBlurred } =
    useBlurredBackgroundContext();

  const [carouselErrorPopUpOpen, setCarouselErrorPopUpOpen] = useState(false);
  const [carouselErrorMessage, setCarouselErrorMessage] = useState({});
  const [carouselList, setCarouselList] = useState([]);
  const [videosList, setVideosList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [currentCarousel, setCurrentCarousel] = useState({
    carouselId: null,
    title: "",
    base: [],
    modified: [],
  });
  const [carouselManagementDisplay, setCarouselManagementDisplay] = useState(0);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleCarouselError = () => {
    setCarouselErrorPopUpOpen(true);
    setIsBackgroundBlurred(true);
  };

  const fetchNewCarousel = (id) => {
    expressAPI.get(`/api/carousels/${id}`).then((res) => {
      if (res.status === 200) {
        setCurrentCarousel({
          carouselId: id,
          title: res.data[0].title,
          base: res.data[0].video_id ? res.data : [],
          modified: [],
        });
      } else {
        setCarouselErrorMessage({
          title: "Database error",
          content:
            "Chosen carousel informations can't be found in the database.",
        }).catch((err) => console.error(err));
        handleCarouselError();
      }
    });
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
      base: [],
      modified: [],
    });
    setCarouselManagementDisplay(displayNumber);
  };

  const handleNewCarouselClick = () => {
    if (currentCarousel.modified.length > 0) {
      setCarouselErrorMessage({
        title: "Carousel has been modified",
        content:
          "You have unsaved modifications on this carousel. Would you like to discard them and proceed ?",
        button: {
          onValidation: "carouselCreation",
          text: "Confirm",
        },
      });
      return handleCarouselError();
    }
    return resetCurrentCarouselThenDisplay(1);
  };

  const handleBackToSelectionClick = () => {
    if (currentCarousel.modified.length > 0) {
      setCarouselErrorMessage({
        title: "Carousel has been modified",
        content:
          "You have unsaved modifications on this carousel. Would you like to discard them and proceed ?",
        button: {
          onValidation: "backToSelection",
          text: "Confirm",
        },
      });
      handleCarouselError();
    } else {
      resetCurrentCarouselThenDisplay(0);
    }
  };

  const deleteCarousel = (id) => {
    expressAPI.delete(`/api/carousels/${id}`).then((res) => {
      if (res.status === 204) {
        setCarouselList([...carouselList.filter((el) => el.id !== id)]);
        resetCurrentCarouselThenDisplay(0);
        setCarouselErrorMessage({
          title: "Deletion successful",
          content: "The carousel has been deleted from the database.",
        });
        handleCarouselError();
      }
    });
  };

  const handleCloseModal = (status) => {
    setCarouselErrorPopUpOpen(false);
    setIsBackgroundBlurred(false);
    if (status === "changeCarousel") {
      fetchNewCarousel(carouselErrorMessage.button.value);
    }
    if (status === "deleteCarousel") {
      deleteCarousel(carouselErrorMessage.button.value);
    }
    if (status === "backToSelection") {
      setCurrentCarousel({
        carouselId: null,
        title: "",
        base: [],
        modified: [],
      });
      setCarouselManagementDisplay(0);
    }
    if (status === "carouselCreation") {
      resetCurrentCarouselThenDisplay(1);
    }
    setCarouselErrorMessage({});
  };

  return (
    <div className={` ${isBackgroundBlurred && "blur-sm"}`}>
      <div className={`flex flex-col mx-2 pt-10  bg-dark `}>
        {carouselManagementDisplay === 0 && (
          <h2 className="font-bold text-xl text-orange self-center pb-4 my-3">
            Carousel management
          </h2>
        )}
        <div className="flex flex-wrap">
          {!isDesktop && carouselManagementDisplay !== 0 ? (
            <button
              type="button"
              onClick={handleBackToSelectionClick}
              className="w-44 h-10 m-2 rounded-3xl font-primary leading-none border-2 border-orange"
            >
              <div className="flex bg-dark">
                <img
                  src={arrowLeft}
                  alt="left arrow"
                  className="stroke-white"
                />
                <p>Back to carousel selection</p>
              </div>
            </button>
          ) : (
            ""
          )}
          <button
            type="button"
            onClick={handleNewCarouselClick}
            className={`w-44 h-10 m-2 rounded-3xl lg:absolute lg:top-5 lg:left-5 font-primary bg-[linear-gradient(90deg,_#FF8200_0%,_#FF2415_100%)] ${
              carouselManagementDisplay === 1 && "invisible"
            }`}
          >
            Create new carousel
          </button>
        </div>
      </div>
      <div className="flex min-h-screen md:h-[1700px] lg:h-[1200px] justify-center lg:justify-start bg-dark ">
        <div>
          {isDesktop || carouselManagementDisplay === 0 ? (
            <CarouselManagementList
              carouselList={carouselList}
              currentCarousel={currentCarousel}
              setCarouselErrorPopUpOpen={setCarouselErrorPopUpOpen}
              setCarouselErrorMessage={setCarouselErrorMessage}
              fetchNewCarousel={fetchNewCarousel}
            />
          ) : (
            ""
          )}
        </div>
        <div className="bg-dark">
          {carouselManagementDisplay === 1 && (
            <CarouselManagementCreate
              videosList={videosList}
              currentCarousel={currentCarousel}
              setCurrentCarousel={setCurrentCarousel}
              carouselList={carouselList}
              setCarouselList={setCarouselList}
              categoriesList={categoriesList}
              setCarouselErrorPopUpOpen={setCarouselErrorPopUpOpen}
              setCarouselErrorMessage={setCarouselErrorMessage}
              setCarouselManagementDisplay={setCarouselManagementDisplay}
            />
          )}
          {carouselManagementDisplay === 2 && (
            <CarouselManagementAssign
              videosList={videosList}
              currentCarousel={currentCarousel}
              setCurrentCarousel={setCurrentCarousel}
              categoriesList={categoriesList}
              setCarouselErrorPopUpOpen={setCarouselErrorPopUpOpen}
              setCarouselErrorMessage={setCarouselErrorMessage}
            />
          )}
          {carouselManagementDisplay === 0 && isDesktop ? (
            <h3 className="ml-8 mt-6 text-xl text-orange">
              Please select "Create new carousel" or select an existing carousel
              in the list.
            </h3>
          ) : (
            ""
          )}
        </div>
      </div>

      <CarouselErrorPopUp
        isOpen={carouselErrorPopUpOpen}
        onClose={handleCloseModal}
        message={carouselErrorMessage}
      />
    </div>
  );
}
