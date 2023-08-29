export default function Footbar() {
  return (
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
        <div className="h-full p-1">
          <img
            className="w-full h-full"
            src="/src/assets/images/Menu.svg"
            alt="menu-logo"
          />
        </div>
      </div>
    </div>
  );
}
