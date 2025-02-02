import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

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
import ProtectedRoute from "../components/ProtectedRoute";
import UserProfileManagement from "../pages/UserProfileManagement";
import CreateUserManagement from "../pages/CreateUserManagement";
import NotFound from "../pages/NotFound";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import NotPremium from "../pages/NotPremium";
import useInstanceWithInterceptor from "../hooks/useInstanceWithInterceptor";

function Router() {
  const { user, setUser } = useCurrentUserContext();
  const expressAPI = useInstanceWithInterceptor();

  useEffect(() => {
    expressAPI.get("/api/auth/verify").then((res) => {
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    });
  }, []);

  const FREE_USER_TYPE = 1;
  const PREMIUM_USER_TYPE = 2;
  const ADMIN_USER_TYPE = 3;

  return (
    <div className="translate-y-16">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignUpLogin />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route
          element={
            <ProtectedRoute
              isAllowed={
                user?.usertype_id === FREE_USER_TYPE ||
                user?.usertype_id === PREMIUM_USER_TYPE ||
                user?.usertype_id === ADMIN_USER_TYPE
              }
            />
          }
        >
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/notpremium" element={<NotPremium />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              isAllowed={
                user?.usertype_id === PREMIUM_USER_TYPE ||
                user?.usertype_id === ADMIN_USER_TYPE
              }
              redirectionPath={
                user?.usertype_id === FREE_USER_TYPE ? "/notpremium" : "/login"
              }
            />
          }
        >
          <Route path="/playlists" element={<Favorites />} />
          <Route path="/playlists/:id" element={<Playlist />} />
          <Route path="/videos/:id" element={<Video />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              isAllowed={user?.usertype_id === ADMIN_USER_TYPE}
              redirectionPath="/"
            />
          }
        >
          <Route path="/admin/category" element={<CategoryManagement />} />
          <Route path="/admin/video" element={<VideoManagement />} />
          <Route path="/admin/carousel" element={<CarouselManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/users/:id" element={<UserProfileManagement />} />
          <Route
            path="/admin/users/create"
            element={<CreateUserManagement />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Router;
