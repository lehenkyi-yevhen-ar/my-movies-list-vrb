
import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainPage from './pages/MainPage.jsx'
import MyList from './components/MyList.jsx'
import MyFavoritesList from './components/MyFavoritesList.jsx'
import PlanToWatchList from './components/PlanToWatchList.jsx'
import Movie from './components/Movie.jsx'
import Cast from './components/Cast.jsx'
import GetMoviesHome from './components/GetMoviesHome.jsx'
import GetMoviesQuery from './components/GetMoviesQuery.jsx'
import StartPage from './pages/StartPage.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<StartPage />}/>
        <Route path='/main' element={<MainPage />} >
          <Route path='' element={<GetMoviesHome />} />
          <Route  path='movies' element={<GetMoviesQuery/>}/>
          <Route  path='my-list' element={<MyList/>}/>
          <Route  path='favorites' element={<MyFavoritesList/>}/>
          <Route path='watch-list' element={<PlanToWatchList />} />
          <Route path='movie-page/:movieId' element={<Movie />} >
            <Route path='cast' element={ <Cast/> } />
          </Route>
        </Route>
      </Routes>
   </>
  )
}

export default App
