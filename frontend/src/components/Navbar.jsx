import "../styles/Navbar.css"
import {Link, Navigate, useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {remove} from "../redux/userSlice" 
import { useSelector } from "react-redux"
import { message } from "antd"
import { useEffect, useState } from "react"
import { hideLoading, showLoading } from '../redux/alertSlice'
import axios from "axios"
import { setUser } from '../redux/userSlice'


const Navbar = () => {

    const {user} = useSelector((state => state.user))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleLogout = () => {
      localStorage.clear()
      dispatch(remove(user))
      message.success("Logout successfully")
      navigate("/")
      }

      const getUser = async() => {
        try {
          dispatch(showLoading())
          
          const res = await axios.post("http://localhost:5000/api/user/getUserData", 
          {token: localStorage.getItem("token")},
          {headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }}
          )
          dispatch(hideLoading())
          if(res.data.success){
            dispatch(setUser(res.data.data))
          } else {
            <Navigate to="/login" />
            localStorage.clear()
          }
          
        } catch (err) {
          dispatch(hideLoading())
          localStorage.clear()
          console.log(err)
        }
      }
    
      useEffect(() => {
        if(!user){
          getUser()
        }
      },[user])

  return (
    <div className="container">
        <div className="wrapper">
            <div className="logo"><Link to="/" style={{textDecoration:"none", color:"#1aac83"}}>Vehicles Management System</Link></div>
             
            <div className="menu">
            { user &&
            <>
              <span className="menu-item" onClick={handleLogout}><Link to="/" style={{textDecoration:"none", color:"grey"}}> Logout</Link></span>
              <span className="menu-item"> {user.name} </span>
            </>
            }
            { !user &&
            <>
              <span className="menu-item"><Link to="/register" style={{textDecoration:"none", color:"grey"}}> Register</Link></span> 
              <span className="menu-item"><Link to="/login" style={{textDecoration:"none", color:"grey"}}>Login</Link></span> 
            </> }
            </div>
        </div>
    </div>
  )
}

export default Navbar
