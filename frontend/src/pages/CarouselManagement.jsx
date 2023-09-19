import { useEffect, useState } from "react";
import { useBlurredBackgroundContext } from "../contexts/BlurredBackgroundContext";
import expressAPI from "../services/expressAPI";
import CarouselErrorPopUp from "../components/CarouselErrorPopUp";

export default function CarouselManagement() {
  const { setIsBackgroundBlurred } = useBlurredBackgroundContext();

  const [newCarouselName, setNewCarouselName] = useState({ title: "" });
  const [carouselList, setCarouselList] = useState([]);
  const [videosList, setVideosList] = useState([]);
  const [currentCarousel, setCurrentCarousel] = useState({
    carouselId: null,
    title: "",
    base: [],
    modified: [],
  });
  const [carouselErrorPopUpOpen, setCarouselErrorPopUpOpen] = useState(false);
  const [carouselErrorMessage, setCarouselErrorMessage] = useState({});

  const handleCarouselError = () => {
    setCarouselErrorPopUpOpen(true);
    setIsBackgroundBlurred(true);
  };

  const createCarousel = () => {
    expressAPI
      .post(`/api/carousels/`, newCarouselName)
      .then((res) => {
        if (res.status === 200)
          setCarouselList([
            ...carouselList,
            { id: res.data.insertId, title: newCarouselName.title },
          ]);
        setCarouselErrorMessage({
          title: "Carousel created",
          content: `Carousel ${newCarouselName.title} has been created in the database.`,
        });
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
      })
      .then(setNewCarouselName({ title: "" }))
      .then(handleCarouselError());
  };

  const handleCreateCarousel = () => {
    if (!newCarouselName.title) {
      setCarouselErrorMessage({
        title: "Creation error",
        content: "You must choose a name for the new carousel first.",
      });
      return handleCarouselError();
    }
    return createCarousel();
  };

  useEffect(() => {
    expressAPI.get(`/api/carousels/`).then((res) => setCarouselList(res.data));
    expressAPI.get(`/api/videos/`).then((res) => setVideosList(res.data));
  }, []);

  const fetchNewCarousel = (id) => {
    expressAPI.get(`/api/carousels/${id}`).then((res) => {
      if (res.status === 200) {
        setCurrentCarousel({
          carouselId: id,
          title: res.data[0].title,
          base: res.data,
          modified: [],
        });
      } else {
        setCarouselErrorMessage({
          title: "Database error",
          content:
            "Chosen carousel informations can't be found in the database.",
        });
        handleCarouselError();
      }
    });
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

  const isChecked = (videoId) => {
    return currentCarousel.base.some((element) => element.video_id === videoId);
  };

  const handleCheckbox = (videoId) => {
    if (currentCarousel.base.some((element) => element.video_id === videoId)) {
      if (
        currentCarousel.modified.some((element) => element.video_id === videoId)
      ) {
        return setCurrentCarousel({
          ...currentCarousel,
          base: currentCarousel.base.filter((el) => el.video_id !== videoId),
          modified: currentCarousel.modified.filter(
            (el) => el.video_id !== videoId
          ),
        });
      }
      return setCurrentCarousel({
        ...currentCarousel,
        base: currentCarousel.base.filter((el) => el.video_id !== videoId),
        modified: [
          ...currentCarousel.modified.filter((el) => el.video_id !== videoId),
          { mod: "removed", video_id: videoId },
        ],
      });
    }
    if (currentCarousel.modified.some((el) => el.video_id === videoId)) {
      return setCurrentCarousel({
        ...currentCarousel,
        base: [...currentCarousel.base, { video_id: videoId }],
        modified: currentCarousel.modified.filter(
          (el) => el.video_id !== videoId
        ),
      });
    }
    return setCurrentCarousel({
      ...currentCarousel,
      base: [...currentCarousel.base, { video_id: videoId }],
      modified: [
        ...currentCarousel.modified.filter((el) => el.video_id !== videoId),
        { mod: "added", video_id: videoId },
      ],
    });
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
    return handleCarouselError();
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
    setCarouselErrorMessage({});
  };

  return (
    <>
      <div>
        <h2>Create new carousel</h2>
        <div className="flex max-h-10">
          <p>New carousel name : </p>
          <input
            className="max-h-9 w-52 h-10 font-primary text-base lg:text-xl p-2 border-2 bg-dark lg:border-2 border-orange rounded-md focus:outline-none "
            type="text"
            name="newCarouselName"
            id="newCarouselName"
            value={newCarouselName.title}
            onChange={(e) => setNewCarouselName({ title: e.target.value })}
          />
          <button
            className="w-36 h-9 rounded-3xl font-primary font-semibold bg-[linear-gradient(90deg,_#FF8200_0%,_#FF2415_100%)]"
            type="button"
            onClick={handleCreateCarousel}
          >
            Create
          </button>
        </div>
      </div>
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
      <h3>{currentCarousel?.title}</h3>

      {videosList.length > 0 && (
        <div>
          <ul className=" border-solid border-2 border-orange w-48 px-5 py-3 rounded-md">
            {videosList.map((video) => (
              <li key={video.name} className="flex ">
                <label htmlFor={`${video.name}`}>{video.name}</label>
                <input
                  className={`${!currentCarousel.carouselId && "invisible"} `}
                  type="checkbox"
                  checked={isChecked(video.id)}
                  onChange={() => handleCheckbox(video.id)}
                  name={`${video.name}`}
                  id={`${video.name}`}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={`${!currentCarousel.carouselId && "invisible"} `}>
        <button
          className="w-42 h-9 m-5 rounded-3xl font-primary font-semibold bg-[linear-gradient(90deg,_#FF8200_0%,_#FF2415_100%)]"
          type="button"
          onClick={saveChanges}
        >{`Save changes on ${currentCarousel.title}`}</button>
        <button
          className="w-36 h-9 m-5 rounded-3xl font-primary font-semibold bg-blue"
          type="button"
          onClick={() => handleCarouselDeletion(currentCarousel.carouselId)}
        >
          {`Delete ${currentCarousel.title}`}
        </button>
      </div>
      <CarouselErrorPopUp
        isOpen={carouselErrorPopUpOpen}
        onClose={handleCloseModal}
        message={carouselErrorMessage}
      />
    </>
  );
}
