import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import formatStringFromDb from "../services/formatStringFromDb";
import interceptor from "../hooks/useInstanceWithInterceptor";

export default function CategoryMenu({ setCategorySelection }) {
  const [categories, setCategories] = useState([]);
  const expressAPI = interceptor();
  const navigate = useNavigate();

  useEffect(() => {
    expressAPI
      .get(`/api/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClick = (id) => {
    setCategorySelection(false);
    navigate(`/category/${id}`);
  };

  return (
    <div>
      {categories.length > 0 && (
        <>
          <button type="button" onClick={() => setCategorySelection(false)}>
            <div className="fixed z-10 top-0 bottom-12 left-0 right-0 " />
          </button>
          <div className="backdrop-blur-xl border-solid border-2 border-orange w-56 px-5 py-3 rounded-md flex flex-col gap-2 items-center fixed z-50 bottom-14 right-2 ">
            <p className="text-orange font-primary font-bold text-lg my-2">
              Select video category:
            </p>
            {categories.map((elem) => (
              <button
                key={elem.name}
                type="button"
                className="text-white font-primary font-bold text-l mb-2"
                onClick={() => handleClick(elem.id)}
              >
                {formatStringFromDb(elem.name)}
              </button>
            ))}
            <button
              className="text-white font-primary font-semibold rounded-full w-auto px-4 py-0.5 mt-1"
              style={{
                background: "linear-gradient(90deg, #FF8200 0%, #FF2415 100%)",
              }}
              type="button"
              onClick={() => setCategorySelection(false)}
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}

CategoryMenu.propTypes = {
  setCategorySelection: PropTypes.func.isRequired,
};
