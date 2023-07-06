import "../styles/Dashboard.css"
import AddNewForm from '../components/AddNewForm'
import Sidebar from "../components/Sidebar"

const AddNew = () => {
  return (
    <div className='d-container'>
      <Sidebar />
      <AddNewForm/>
    </div>
  )
}

export default AddNew
