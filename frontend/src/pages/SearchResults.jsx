import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategorySearchResults from "../components/CategorySearchResult";
import expressAPI from "../services/expressAPI";

export default function SearchResults() {
  const { query } = useParams();

  const [currentSearch, setCurrentSearch] = useState([]);

  useEffect(() => {
    expressAPI
      .get(`/api/videos/search?${query}`)
      .then((res) => {
        setCurrentSearch(res.data);
      })
      .catch((err) => console.error(err));
  }, [query]);

  const categoryArray = [
    ...new Set(currentSearch.map((video) => video.category)),
  ];

  return (
    <div>
      <p className="text-center text-orange text-2xl drop-shadow-md font-semibold font-primary m-8 ">
        Your search results
      </p>
      {currentSearch.length ? (
        categoryArray.map((category) => (
          <CategorySearchResults
            key={category.id}
            categoryName={category}
            searchResults={currentSearch}
          />
        ))
      ) : (
        <p className="text-center text-orange text-lg drop-shadow-md font-semibold font-primary m-10 ">
          Your search parameters returned no matching video.
        </p>
      )}
    </div>
  );
}
