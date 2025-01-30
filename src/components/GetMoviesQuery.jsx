import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { fetchMovieList } from "../services/allMoviesApi"
import MoviesList from "./MoviesList"
import Loader from "../services/Loader"

const GetMoviesQuery = () => {

const [movies, setMovies] = useState([])
const [searchParams] = useSearchParams()
const query = searchParams.get("query") ?? ""
  const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!query) {
      return
    }
    const getMoviesByQuery = async () => {

      try {
        setIsError(false)
        setIsLoading(true)
        const data = await fetchMovieList(
          query
        )
        

        setMovies(data)
      } catch (error) {
        setIsError(true)
        console.error(error);
      } finally {
        setIsLoading(false)
      }
    }
    getMoviesByQuery()
  }, [query])

     const loadMoreMovies = async () => {
           const data = await fetchMovieList(page + 1) 
           setMovies(prevMovies => [...prevMovies, ...data]) 
           setPage(prevPage => prevPage + 1) 
       }

    
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <MoviesList movies={movies} loadMoreMovies={loadMoreMovies} />
      )}
    </>
  )
}

export default GetMoviesQuery