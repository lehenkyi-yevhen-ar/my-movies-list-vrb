import { Outlet } from "react-router-dom"
import SearchBar from "../components/SearchBar.jsx"
import ToolBar from "../components/ToolBar.jsx"


const MainPage = () => {
  return (
    <div className="flex p-2 w-full h-screen">
      <ToolBar />
      <div className="flex flex-col w-full h-full">
        <SearchBar />
        <Outlet/>
      </div>
    </div>
  )
}

export default MainPage