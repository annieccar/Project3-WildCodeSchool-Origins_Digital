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
import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../pages/NotFound";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

function Router() {
  const { user } = useCurrentUserContext();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignUpLogin />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/search/:query" element={<SearchResults />} />
      <Route
        element={
          <ProtectedRoute
            isAllowed={user?.usertype_id === 2 || user?.usertype_id === 3}
          />
        }
      >
        <Route path="/playlists" element={<Favorites />} />
        <Route path="/playlists/:id" element={<Playlist />} />
        <Route path="/videos/:id" element={<Video />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>
      <Route path="/admin/category" element={<CategoryManagement />} />
      <Route path="/admin/video" element={<VideoManagement />} />
      <Route path="/admin/carousel" element={<CarouselManagement />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
