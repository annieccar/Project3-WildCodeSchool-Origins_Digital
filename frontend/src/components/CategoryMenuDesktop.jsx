import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import formatStringFromDb from "../services/formatStringFromDb";
import expressAPI from "../services/expressAPI";

export default function CategoryMenuDesktop({ setCategorySelection }) {
  const [categories, setCategories] = useState([]);

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
        <div className="backdrop-blur-md border-solid border-2 border-orange w-48 px-5 py-3 rounded-md flex flex-col gap-2 items-start absolute z-50 top-14 right-1/2 translate-x-3/4 ">
          {categories.map((elem) => (
            <button
              key={elem.id}
              type="button"
              className="text-white hover:text-orange font-primary font-bold text-l my-2"
              onClick={() => handleClick(elem.id)}
            >
              {formatStringFromDb(elem.name)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

CategoryMenuDesktop.propTypes = {
  setCategorySelection: PropTypes.func.isRequired,
};
