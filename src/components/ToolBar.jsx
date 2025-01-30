import clsx from "clsx"
import { NavLink } from "react-router-dom"
import s from './ToolBar.module.css'

const ToolBar = () => {
    const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink)
  }
  return (
      <div className="flex flex-col border-2 rounded-md mr-2 p-5 max-w-max ">
        <div className="mb-40 ">
            <h2 className="font-semibold text-2xl">MyMoviesList</h2>
        </div>
        <div className="flex flex-col text-lg gap-5 items-center">
            <NavLink className={buildLinkClass} to="/main" end>Home Page</NavLink>
            <NavLink className={buildLinkClass}to="my-list">My List</NavLink>
            <NavLink className={buildLinkClass}to="favorites">My Favorites</NavLink>
            <NavLink className={buildLinkClass}to="watch-list">Plan to watch</NavLink>
        </div>
      </div>
  )
}

export default ToolBar