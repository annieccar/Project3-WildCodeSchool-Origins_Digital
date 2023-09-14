import { useEffect, useState } from "react";
import expressAPI from "../services/expressAPI";

export default function CarouselManagement() {
  const [newCarousel, setNewCarousel] = useState({});
  const [carouselList, setCarouselList] = useState([]);
  // console.table(newCarousel);
  // console.table(carouselList);

  const createCarousel = () => {
    expressAPI.post(`/api/carousels/`, newCarousel).then(
      (res) => res.status === 201
      //  && console.log("created")
    );
  };
  const handleCreateCarousel = () => {
    if (!newCarousel.name || !newCarousel.length) {
      return;
      // console.log("missing infos");
    }
    createCarousel();
  };

  useEffect(() => {
    expressAPI.get().then((res) => setCarouselList(res.data));
  }, []);

  const handleCarouselSelected = (currentCarousel) => {
    expressAPI.get(`/api/carousels/${currentCarousel.id}`);
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
            onChange={(e) =>
              setNewCarousel({ ...newCarousel, name: e.target.value })
            }
          />
        </div>
        <div>
          <p>New carousel length</p>
          <input
            type="number"
            name="newCarouselLength"
            id="newCarouselLength"
            onChange={(e) =>
              setNewCarousel({ ...newCarousel, length: e.target.value })
            }
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
              onClick={handleCarouselSelected(carousel)}
            >
              {carousel.carousel_name}
            </button>
          ))}
      </div>
    </div>
  );
}
