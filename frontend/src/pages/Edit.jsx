import "../styles/Dashboard.css"
import EditForm from '../components/EditForm'
import Sidebar from "../components/Sidebar"

const AddNew = () => {
  return (
    <div className='d-container'>
      <Sidebar />
      <EditForm/>
    </div>
  )
}

export default AddNew
