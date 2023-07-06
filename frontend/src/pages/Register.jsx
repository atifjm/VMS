import React from 'react'
import { Form, Input, message } from "antd"
import "../styles/Register.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import {showLoading, hideLoading} from "../redux/alertSlice"
import { useDispatch } from 'react-redux'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post("http://localhost:5000/api/user/register", values)
      dispatch(hideLoading())
      if(res.data.success){
        message.success("User registered successfully")
        navigate("/login")
      } else {
        message.error(res.data.message)
      }
  } catch (err) {
      dispatch(hideLoading())
      console.log(err)
      message.error("Something is wrong during fetching")
    } 
  }     

  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={onFinishHandler} className='card p-5' >
          <h4 className='mb-4 text-center'>Registration</h4>
          <Form.Item label="Name" name="name">
            <Input type="text" required/>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required/>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required/>
          </Form.Item>
          <Link to="/login" className="mb-3" style={{textDecoration:"none"}}>Already registered, go to login page</Link>
          <button type="submit" className='btn-custom'>Register</button>
        </Form>
      </div>
    </>
  )
}

export default Register

