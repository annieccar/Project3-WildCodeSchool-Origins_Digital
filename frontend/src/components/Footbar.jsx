import { useState } from "react";
// import axios from "axios";

export default function Footbar() {
  const [categorySelection, setCategorySelection] = useState(false);
  // const [categories, setCategories] = useState([]);

  const handleCategory = () => {
    setCategorySelection(true);
  };

  return (
    <>
      <div className="fixed bottom-0 w-full">
        <div className="bg-dark w-full h-12 flex justify-around md:hidden">
          <div className="h-full  p-1">
            <img
              className="w-full h-full"
              src="/src/assets/images/Home.svg"
              alt="home-logo"
            />
          </div>

          <div className="h-full p-1">
            <img
              className="w-full h-full"
              src="/src/assets/images/Playlist.svg"
              alt="playlist-logo"
            />
          </div>

          <div className="h-full p-1">
            <img
              className="w-full h-full"
              src="/src/assets/images/Search.svg"
              alt="search-logo"
            />
          </div>
          <button className="h-full p-1" type="button" onClick={handleCategory}>
            <img
              className="w-full h-full"
              src="/src/assets/images/Menu.svg"
              alt="menu-logo"
            />
          </button>
        </div>
      </div>
      {categorySelection && (
        <>
          <button type="button" onClick={() => setCategorySelection(false)}>
            <div className="fixed z-10 top-0 bottom-12 left-0 right-0 backdrop-blur-md" />
          </button>
          <div className="bg-dark border-solid border-2 border-orange w-56 px-5 py-3 rounded-md flex flex-col gap-2 items-center absolute z-50 bottom-14 right-2 ">
            <p className="text-orange font-primary font-bold text-lg my-2">
              Select video category:
            </p>
            <button type="button" onClick={() => setCategorySelection(false)}>
              Close
            </button>
          </div>
        </>
      )}
    </>
  );
}
