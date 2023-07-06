
import "../styles/AddNewForm.css";
import { Form, Input, Select, message } from "antd"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import {showLoading, hideLoading} from "../redux/alertSlice"

const AddNewForm = () => {

  const {user} = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post("http://localhost:5000/api/vehicle/add", {...values, userId:user._id})
      dispatch(hideLoading())
      if(res.data.success){
        message.success("Record added successfully")
        navigate("/dashboard")
      } else {
        message.error(res.data.success)
      }
     
    } catch (err) {
      dispatch(hideLoading())
      console.log(err)
      message.error("Something is wrong")
    }   
  }
  
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h5 style={{color:"#1aac83", marginBottom: "20px", marginTop:"10px"}}>Add New Record</h5>
        <Form style={{width:"80%"}} layout="vertical" onFinish={handleSubmit} >
          
          <Form.Item style={{height:"50px"}}label="Category" name="category">
            <Select>
              <Select.Option value="hatchback">Hatchback</Select.Option>
              <Select.Option value="sedan">Sedan</Select.Option>
              <Select.Option value="suv">SUV</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item style={{height:"50px"}} label="Brand" name="brand">
            <Select>
              <Select.Option value="toyota">Toyota</Select.Option>
              <Select.Option value="honda">Honda</Select.Option>
              <Select.Option value="nissan">Nissan</Select.Option>
              <Select.Option value="suzuki">Suzuki</Select.Option>
              <Select.Option value="mitsubishi">Mitsubishi</Select.Option>
              <Select.Option value="kia">KIA</Select.Option>
              <Select.Option value="bmw">BMW</Select.Option>
              <Select.Option value="mercedes">Mercedes</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item style={{height:"50px"}} label="Model" name="model">
            <Select>
              <Select.Option value="corolla">Corolla</Select.Option>
              <Select.Option value="yaris">Yaris</Select.Option>
              <Select.Option value="prado">Prado</Select.Option>
              <Select.Option value="landcruiser">Land Cruiser</Select.Option>
              <Select.Option value="city">City</Select.Option>
              <Select.Option value="civic">Civic</Select.Option>
              <Select.Option value="sunny">Sunny</Select.Option>
              <Select.Option value="alto">Alto</Select.Option>
              <Select.Option value="swift"> Swift</Select.Option>
              <Select.Option value="cultus">Cultus</Select.Option>
              <Select.Option value="lancer">Lancer</Select.Option>
              <Select.Option value="320">320</Select.Option>
              <Select.Option value="c360">C 360</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item style={{height:"50px"}} label="Make (YYYY)" name="make">
            <Input type="text"/>
          </Form.Item>
          <Form.Item style={{height:"50px"}} label="Color" name="color">
            <Select>
              <Select.Option value="white">White</Select.Option>
              <Select.Option value="black">Black</Select.Option>
              <Select.Option value="silver">Silver</Select.Option>
              <Select.Option value="grey">Grey</Select.Option>
              <Select.Option value="red">Red</Select.Option>
              <Select.Option value="blue">Blue</Select.Option>
              <Select.Option value="green">Green</Select.Option>
              <Select.Option value="yellow">Yellow</Select.Option>
            </Select>
          </Form.Item> 
          <Form.Item style={{height:"50px"}} label="Registration No" name="registration">
            <Input type="text"/>
          </Form.Item>
          <div className="d-flex justify-content-center">
          <button className="add-button" type="submit">ADD</button>
          </div>
        </Form>
        
      </div>
      
    </div>
  )
};

export default AddNewForm;
