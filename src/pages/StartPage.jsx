import { useNavigate } from "react-router-dom"

const StartPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/main')
  }
  return (
      <>
          <div>StartPage</div>
          <button onClick={handleClick} className="border-2 rounded-2xl mt-3 bg-amber-100 p-4 cursor-pointer">Go to Main Page</button> 
      </>
  )
}

export default StartPage