import { useNavigate } from "react-router-dom"


const Notfoundpage = () => {
    const navigate = useNavigate();
  return (
    <>
    <h1>404</h1>
    <h2>page not found</h2>
    <button onClick={() => navigate('/login')}>Login</button>

    </>
  )
}

export default Notfoundpage