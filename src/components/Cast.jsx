import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchCastByMovieId } from "../services/allMoviesApi"
import Loader from "../services/Loader"


const Cast = () => {
  const { movieId } = useParams()
  const [cast, setCast] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCastByMovieId(
        movieId
      )
      setCast(data.cast)
    }
    getData()
  }, [movieId])

  if (!cast) return <Loader />

  return (
    <div>
      <ul className='grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-y-3.5 gap-x-4'>
        {cast.map((actor) => (
          <li
            key={actor.id}
            className='relative h-90 pb-3.5 pt-3.5'
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt=""
              className='w-full h-full'
            />
            <p className='font-semibold'>
              {actor.name}
            </p>
            <p>
              Character: {actor.character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Cast
