import React from 'react'
import { Form, Input, message } from "antd"
import "../styles/Login.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from 'react-redux'
import {showLoading, hideLoading} from "../redux/alertSlice"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post("http://localhost:5000/api/user/login", values)
      window.location.reload()
      dispatch(hideLoading())
      if(res.data.success) {
        localStorage.setItem("token", res.data.token)
        message.success(`Login Successfully`)
        navigate("/dashboard")
      } else {
        message.error(res.data.message)
      }
      
    } catch (err) {
      dispatch(hideLoading())
      console.log(err)
      message.error("Something is wrong")
    }
  }
  
  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={onFinishHandler} className='card p-5' >
          <h4 className='mb-4 text-center'>Login</h4>
          <Form.Item label="Email" name="email">
            <Input type="email" required/>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required/>
          </Form.Item>
          <Link to="/register" className="mb-3" style={{textDecoration:"none"}}> Not registered, go to registration page </Link>
          <button type="submit" className='btn-custom'>Login</button>
        </Form>
      </div>
    </>
  )
}

export default Login
