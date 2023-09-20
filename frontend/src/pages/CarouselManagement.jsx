import { useEffect, useState } from "react";
import { useBlurredBackgroundContext } from "../contexts/BlurredBackgroundContext";
import useMediaQuery from "../hooks/useMediaQuery";
import expressAPI from "../services/expressAPI";
import CarouselErrorPopUp from "../components/CarouselErrorPopUp";
import CarouselManagementList from "../components/CarouselManagementList";
import CarouselManagementCreate from "../components/CarouselManagementCreate";
import CarouselManagementAssign from "../components/CarouselManagementAssign";

export default function CarouselManagement() {
  const { setIsBackgroundBlurred } = useBlurredBackgroundContext();

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

  const isTablet = useMediaQuery("(min-width: 480px)");
  // const isDesktop = useMediaQuery("(min-width: 1024px)");
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

  const handleNewCarouselClick = () => {
    setCurrentCarousel({
      carouselId: null,
      title: "",
      base: [],
      modified: [],
    });
    setCarouselManagementDisplay(1);
  };

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
      setCurrentCarousel({
        carouselId: null,
        title: "",
        base: [],
        modified: [],
      });
      setCarouselManagementDisplay(0);
    }
  };

  const deleteCarousel = (id) => {
    expressAPI.delete(`/api/carousels/${id}`).then((res) => {
      if (res.status === 204) {
        setCarouselList([...carouselList.filter((el) => el.id !== id)]);
        setCurrentCarousel({
          carouselId: null,
          title: "",
          base: [],
          modified: [],
        });
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
    setCarouselErrorMessage({});
  };

  return (
    <>
      {carouselManagementDisplay !== 1 && (
        <button type="button" onClick={handleNewCarouselClick}>
          Create new carousel
        </button>
      )}
      {!isTablet && carouselManagementDisplay !== 0 ? (
        <button type="button" onClick={handleBackToSelectionClick}>
          Back to carousel selection
        </button>
      ) : (
        ""
      )}
      {isTablet || carouselManagementDisplay === 0 ? (
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

      <CarouselErrorPopUp
        isOpen={carouselErrorPopUpOpen}
        onClose={handleCloseModal}
        message={carouselErrorMessage}
      />
    </>
  );
}
