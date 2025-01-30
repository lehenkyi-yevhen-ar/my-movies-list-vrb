import axios from "axios"

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjUyZTQzOGNjYzhiNTMyMmFkNmRlMDY5NTU4YzlhNSIsIm5iZiI6MTcyNzg2MTQyNi4zNjA4OTUsInN1YiI6IjY2ZmQwY2VlNzA0MWQ2MGYzM2QwNjZkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UAPZp1WcwyqbX4vzmBBSFNxSyNcFbLUF7cQY8h-js0w",
  },
  params: {
    language: "en-US",
    include_adult: "false",
  },
}

const BASE_URL = "https://api.themoviedb.org/3"

export const fetchMovieList = async (
  query,
  page = 1
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie`,
      {
        ...options,
        params: {
          page,
          query: encodeURIComponent(query),
        },
      }
    )
    return response.data.results
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchMovieById = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}`,
    options
    )
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const fetchCastByMovieId = async (
  movieId
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/credits`,
      options
    )
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const fetchTrendingMovies = async (page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/day`,
      {
        ...options, params: {
        page
      } }
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}


export const myMoviesBackApi = axios.create({
  baseURL: "https://mymovies-back.onrender.com",

  headers: {
    "Content-Type": "application/json"
  }
})

export const addToList = async (movie) => {
  try {
    const response = await myMoviesBackApi.post("/movies", movie);
    console.log("Response data:", response.data); 
    return response.data
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export const updateMovieStatus = async (movieId, statusType, statusValue) => {
  try {
    const response = await myMoviesBackApi.patch(`/movies/${movieId}`, {
      [statusType]: statusValue,
    });
    return response.data
  } catch (error) {
    console.error(`${statusType}`, error);
    throw error;
  }
};

export const fetchMyListMovies = async (page = 1) => {
  try {
    const response = await myMoviesBackApi.get('/movies', {
      params: {page}
    });
    return response.data
  } catch (error) {
    throw new Error('Error fetching my movie list:', error);
  }
};