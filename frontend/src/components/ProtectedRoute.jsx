import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAllowed, redirectionPath = "/login", children }) {
  if (!isAllowed) return <Navigate to={redirectionPath} replace />;

  return children || <Outlet />;
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  redirectionPath: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

ProtectedRoute.defaultProps = {
  redirectionPath: "/login",
  children: undefined,
};
