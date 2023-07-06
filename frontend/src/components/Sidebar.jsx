import "../styles/Sidebar.css"
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { message } from 'antd';
import { SidebarMenu } from "../Data/data";
import {useDispatch} from "react-redux"
import {remove} from "../redux/userSlice" 
import { useSelector } from "react-redux"


const Sidebar = () => {

  const {user} = useSelector((state => state.user))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

    const handleLogout = () => {
      localStorage.clear()
      dispatch(remove(user))
      message.success("Logout successfully")
      navigate("/")
    }


  return (
    <div className="sidebar">
      <div className="s-wrapper">
        <div className="s-logo">VMS</div>
        
          {SidebarMenu.map((menu) => {
            const isActive = location.pathname === menu.path
            return (
            <>
              <div className={`s-menu-item ${isActive && "active"}`}>
              <div className="s-icon"> {menu.icon} </div>
              <Link style={{textDecoration:"none",}}to={menu.path}><div className="s-menu">{menu.name}</div></Link>
              </div>
            </>
            )
          })}
      </div>
    </div>
  )
}

export default Sidebar
