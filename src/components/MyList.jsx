import { useEffect, useState } from "react";
import { fetchMyListMovies } from "../services/allMoviesApi";
import Loader from "../services/Loader";
import MoviesList from "./MoviesList";

const MyList = () => {
  const [myMovies, setMyMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(1)


  useEffect(() => {
    const getMyListMovies = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMyListMovies();
        
        setMyMovies(data.data);
        
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getMyListMovies();
  }, []);

   const loadMoreMovies = async () => {
        const data = await fetchMyListMovies(page + 1) 
        setMyMovies(prevMovies => [...prevMovies, ...data.data]) 
        setPage(prevPage => prevPage + 1) 
    }

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <MoviesList movies={myMovies} loadMoreMovies={loadMoreMovies} />
      )}
    </div>
  );
};

export default MyList