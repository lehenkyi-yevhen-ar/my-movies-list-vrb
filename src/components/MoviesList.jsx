import { Link, useLocation } from "react-router-dom"

const MoviesList = ({movies, loadMoreMovies}) => {
    const location = useLocation()
    return (
    
      <div className="h-screen flex flex-col">
      <ul className="flex-1 overflow-y-auto p-3.5 grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4">
        {movies.map((movie) => (
          <li key={movie.id} className="relative h-[400px] pb-3.5 pt-3.5">
            <Link to={`/main/movie-page/${movie.id}`} state={location}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=""
                className="w-full h-full"
              />
              <p className="text-center pt-1.5 font-semibold">{movie.title}</p>
            </Link>
          </li>
        ))}

        {movies.length >= 20 && (
          <li className="col-span-full flex justify-center py-4">
            <button 
              onClick={loadMoreMovies} 
              className="px-6 py-2 border-2 rounded-md"
            >
              Load More
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default MoviesList