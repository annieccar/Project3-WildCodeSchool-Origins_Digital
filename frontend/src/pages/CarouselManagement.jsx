import { useEffect, useState } from "react";
import expressAPI from "../services/expressAPI";

export default function CarouselManagement() {
  const [newCarouselName, setNewCarouselName] = useState({});
  const [carouselList, setCarouselList] = useState([]);
  const [videosList, setvideosList] = useState([]);

  // console.table(newCarouselName);
  // console.table(carouselList);

  const createCarousel = () => {
    expressAPI.post(`/api/carousels/`, newCarouselName).then(
      (res) => res.status === 201
      //  && console.log("created")
    );
  };
  const handleCreateCarousel = () => {
    if (!newCarouselName) {
      return;
      // console.log("missing infos");
    }
    createCarousel();
  };

  useEffect(() => {
    expressAPI.get(`/api/carousels/`).then((res) => setCarouselList(res.data));
  }, []);

  const handleCarouselSelected = (currentCarouselId) => {
    // console.log(currentCarouselId);
    expressAPI.get(`/api/carousels/${currentCarouselId}`).then((res) => {
      if (res.status === 200) {
        setvideosList(res.data);
      } else {
        throw new ReferenceError();
      }
    });
  };
  return (
    <div>
      <div>
        <h2>Create new carousel</h2>
        <div>
          <p>New carousel name : </p>
          <input
            type="text"
            name="newCarouselName"
            id="newCarouselName"
            onChange={(e) => setNewCarouselName({ title: e.target.value })}
          />
        </div>

        <button type="button" onClick={handleCreateCarousel}>
          Create
        </button>
      </div>
      <div>
        <p>Carousels list</p>
        {carouselList.length > 0 &&
          carouselList.map((carousel) => (
            <button
              type="button"
              key={carousel.id}
              onClick={() => handleCarouselSelected(carousel.id)}
            >
              {carousel.title}
            </button>
          ))}
      </div>
      <div>
        {videosList.length > 0 && (
          <div>
            <h3>{videosList[0].carousel_name}</h3>
            <ul className=" border-solid border-2 border-orange w-48 px-5 py-3 rounded-md">
              {videosList.map((video) => (
                <li key={video.video_name} className="flex ">
                  <label htmlFor={`${video.video_name}`}>
                    {video.video_name}
                  </label>
                  <input
                    type="checkbox"
                    name={`${video.video_name}`}
                    id={`${video.video_name}`}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
