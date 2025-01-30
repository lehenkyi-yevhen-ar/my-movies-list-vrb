import { useEffect, useRef, useState } from "react"
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom"
import { addToList, fetchMovieById, updateMovieStatus } from "../services/allMoviesApi.js"
import Loader from "../services/Loader.jsx"

const Movie = () => {
const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const location = useLocation()
  const goBackRef = useRef(location.state)
    
  useEffect(() => {
    const getData = async () => {
      const data = await fetchMovieById(movieId)
      
      setMovie(data)
    }
    getData()
  }, [movieId])

  if (!movie) return <Loader />

  const userScore = (
    movie.vote_average * 10
  ).toFixed(0)
 
  const handleAddToList = async () => {
  
  try {
      const genres = movie.genres.map(genre => genre.name);
    const movieData = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        original_title: movie.original_title,
        production_countries: movie.production_countries,
        release_date: movie.release_date,
        runtime: movie.runtime,
        overview: movie.overview,
        genres: genres
    };

    await addToList(movieData);
    
    } catch (error) {
      console.error(error);
    }
  };

   const handleAddToFav = async () => {
    try {
      await updateMovieStatus(movieId, "isFavorite", true)
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToPlan = async () => {
    try {
      await updateMovieStatus(movieId, "planToWatch", true)
    } catch (error) {
      console.error(error);
    }
  };



    return (
    <div className='pt-3.5 pl-3.5 pr-3.5 overflow-y-auto'>
      <Link
        className='text-red-800 text-md hover:shadow-2xs'
        to={goBackRef.current}
      >
        Go back
      </Link>
      <div className='flex border-b-1'>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt=""
          className='w-75 h-full mt-3.5 mr-3.5 mb-3.5'
        />
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-bold'>{movie.title}</h2>
          <p className='mb-1'>
            Original title: {movie.original_title}
          </p>
          <p className='mb-1'>
            Country:{" "}
            {movie.production_countries
              .map((country) => country.name)
              .join(", ")}
          </p>
          <p className='mb-1'>
            Year: {movie.release_date.slice(0, 4)}
          </p>
          <p className='mb-1'>
            Total users score: {userScore}%
          </p>
          <p className='mb-1'>
            Duration: {movie.runtime} min
          </p>
          <h3 className="text-xl font-semibold">Overview</h3>
          <p className='mb-1'>
            {movie.overview}
          </p>
          <h3 className="text-xl font-semibold">Genres</h3>
          <p className='mb-1'>
            {movie.genres
              .map((genre) => genre.name)
              .join(", ")}
          </p>
          </div>
          <button onClick={handleAddToList}>Add to My List</button>
          <button onClick={handleAddToFav}>Add to Favorites</button>
          <button onClick={handleAddToPlan}>Plan to watch</button>
        </div>
      <p className='font-semibold mt-2 mb-2'>
        Additional information
      </p>
      <div className='flex flex-col border-b-1'>
        <NavLink className='mb-2' to="cast">
          Cast
        </NavLink>
      </div>
      <Outlet />
    </div>
  )  
}

export default Movie