import { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

import CategoryMenu from "./CategoryMenu";
import ToolboxPopUp from "./ToolboxPopUp";

export default function Footbar() {
  const { user } = useCurrentUserContext();

  const [categorySelection, setCategorySelection] = useState(false);
  const [toolboxOpen, setToolboxOpen] = useState(false);

  const handleCategory = () => {
    setCategorySelection(true);
  };

  const handleToolboxClick = () => {
    setToolboxOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-0 w-full">
        <div className="bg-dark w-full h-12 flex justify-around lg:hidden">
          <Link to="/" className="h-full  p-1">
            <img
              className="w-full h-full"
              src="/src/assets/images/Home.svg"
              alt="home-logo"
            />
          </Link>

          <Link to="/playlists" className="h-full p-1">
            <img
              className="w-full h-full"
              src="/src/assets/images/Playlist.svg"
              alt="playlist-logo"
            />
          </Link>

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
          {user?.usertype_id === 3 && (
            <button
              className="h-full p-1"
              type="button"
              onClick={handleToolboxClick}
            >
              <img
                className="w-full h-full"
                src="/src/assets/images/Tool.svg"
                alt="menu-tool"
              />
            </button>
          )}
        </div>
      </div>
      {categorySelection && (
        <CategoryMenu setCategorySelection={setCategorySelection} />
      )}
      {toolboxOpen && (
        <ToolboxPopUp
          isOpen={toolboxOpen}
          onClose={() => setToolboxOpen(!toolboxOpen)}
        />
      )}
    </>
  );
}
