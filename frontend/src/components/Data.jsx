import "../styles/Data.css";
import DataTable from "react-data-table-component"
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from '../redux/alertSlice'
import axios from "axios"
import { useNavigate, Navigate, useLocation, Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { message } from "antd";
import setUser from "../redux/userSlice"

const Data = () => {

  const user = useSelector((state => state.user))
  const [query, setQuery] = useState([])    
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [records, setRecords] = useState([])

  const getAllRecords = async () => {
    try {
      //dispatch(showLoading())
      const id = user.user._id
        
      const res = await axios.get(`http://localhost:5000/api/vehicle/get-user-records/${id}`)
      if(res.data){
        setRecords(res.data)    
        //message.success("Records fetched successfully")
      } 
      //else {
      //  message.error("Something wrong while fetching")
      //}
        
    } catch (err) {
      dispatch(hideLoading())
      console.log(err)
      message.error("Something is wrong")
    }
  }

  useEffect(() => {
  getAllRecords()

},[]) 
  
  const columns = [
    {
      name: "Id",
      selector: records => records._id,
      sortable: true,
      width: "250px"
    },
    {
      name: "Category",
      selector: records => records.category,
      sortable: true,
      width: "150px"
    },
    {
      name: "Brand",
      selector: records => records.brand,
      sortable: true
    },
    {
      name: "Model",
      selector: records => records.model,
      sortable: true
    },
    {
      name: "Make",
      selector: records => records.make,
      sortable: true
    },
    {
      name: "Color",
      selector: records => records.color,
      sortable: true
    },
    {
      name: "Reg No",
      selector: records => records.registration,
      sortable: true
    },
    {
      name: "Actions",
      selector: records => <> <EditIcon onClick={()=>handleEdit(records._id)} htmlColor="blue" style={{fontSize:"15px", marginRight:"15px", cursor:"Pointer"}}/> 
                      <ClearIcon onClick= {()=>deleteRecord(records._id)} htmlColor="red" style={{fontSize:"15px", marginRight:"15px", cursor:"Pointer"}}/> </>
                  
    },
  ]

  const handleEdit = async (id) => {
    navigate(`/edit/${id}`)
  }

  const deleteRecord = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/vehicle/delete-record/${id}`)
      message.success("Record deleted successfully")
      getAllRecords()
      
    } catch (err) {
      dispatch(hideLoading())
      console.log(err)
      message.error("Something is wrong")
    }
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

  const handleClick = (e) => {
    navigate("/addnew")
  }

  return (
    <div className="data-container">
      <div className="data-wrapper">
        <div className="top">
          <div className="title">Welcome {user.name}</div>
         {/* <div className="search-bar">
            <input
              className="input-bar"
              type="text"
              placeholder="Search . . . ."
            ></input>
          </div>
        */}
          <button className="button" onClick={handleClick}>Add New</button>
        </div>

        <div className="bottom">
          <div className="bottom-wrapper">
            <div className="data-table">
            
              <DataTable columns={columns} data={records} pagination paginationPerPage={10} fixedHeader highlightOnHover />     
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Data;
