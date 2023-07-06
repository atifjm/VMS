import { Link } from "react-router-dom"
import "../styles/Content.css"

const Content = () => {
  return (
    <div className="m-container">
        <div className="m-wrapper">
            <div className="text">
            <p>Welcome, Please <Link to="/login" style={{textDecoration:"none", color:"gold"}}> Login</Link> or <Link to="register" style={{textDecoration:"none", color:"gold"}}>Register</Link> to continue</p>
            </div>
        </div>
    </div>
  )
}

export default Content
