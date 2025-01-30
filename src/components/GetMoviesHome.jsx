import { useEffect, useState } from "react"
import { fetchTrendingMovies } from "../services/allMoviesApi"
import Loader from "../services/Loader"
import MoviesList from "./MoviesList"


const GetMoviesHome = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] =
    useState(false)
  const [page, setPage] = useState(1)


  useEffect(() => {
    const getTrending = async () => {
      setIsLoading(true)
      const data = await fetchTrendingMovies()
      setMovies(data.results)
        setIsLoading(false)        
    }
    getTrending()
  }, [])

  const loadMoreMovies = async () => {
      const data = await fetchTrendingMovies(page + 1) 
      setMovies(prevMovies => [...prevMovies, ...data.results]) 
      setPage(prevPage => prevPage + 1) 
  }
  
  if (isLoading) return <Loader />

  return (
     <div>
      <MoviesList movies={movies} loadMoreMovies={loadMoreMovies} />
      
    </div>
  )
}

export default GetMoviesHome