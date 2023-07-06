import React, { useEffect } from 'react'
import {Navigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import { hideLoading, showLoading } from '../redux/alertSlice'
import axios from "axios"
import { setUser } from '../redux/userSlice'

const ProtectedRoute = ({children}) => {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.user)

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
  },[user, getUser])

  if(localStorage.getItem("token")){
    return children
  } else {
    return <Navigate to="login"/>
  }
}

export default ProtectedRoute
