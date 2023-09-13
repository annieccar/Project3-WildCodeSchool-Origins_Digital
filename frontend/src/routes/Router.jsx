import { Routes, Route } from "react-router-dom";

import Playlist from "../pages/Playlist";
import Home from "../pages/Home";
import SignUpLogin from "../pages/SignUpLogin";
import Category from "../pages/Category";
import Favorites from "../pages/Favorites";
import SearchResults from "../pages/SearchResults";
import Video from "../pages/Video";
import UserProfile from "../pages/UserProfile";
import CategoryManagement from "../pages/CategoryManagement";
import VideoManagement from "../pages/VideoManagement";
import CarouselManagement from "../pages/CarouselManagement";
import UserManagement from "../pages/UserManagement";
import NotFound from "../pages/NotFound";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignUpLogin />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/playlists" element={<Favorites />} />
      <Route path="/playlists/:id" element={<Playlist />} />
      <Route path="/search/:query" element={<SearchResults />} />
      <Route path="/videos/:id" element={<Video />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/admin/category" element={<CategoryManagement />} />
      <Route path="/admin/video" element={<VideoManagement />} />
      <Route path="/admin/carousel" element={<CarouselManagement />} />
      <Route path="/admin/user" element={<UserManagement />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
