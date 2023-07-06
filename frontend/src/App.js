import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import {useSelector} from "react-redux"
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AddNew from "./pages/AddNew";
import Edit from "./pages/Edit";

function App() {
  const {loading} = useSelector(state => state.alerts)
  
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      {loading ? 
      (<Spinner/>)
      :
        (<Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element = {<PublicRoute> <Register/> </PublicRoute>}/>
          <Route path="/login" element = {<PublicRoute><Login/> </PublicRoute>} />
          <Route path="/dashboard" element = {<ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>
          <Route path="/addnew" element = {<ProtectedRoute> <AddNew/> </ProtectedRoute>}/>
          <Route path="/edit/:id" element = {<ProtectedRoute> <Edit/> </ProtectedRoute>}/>
        </Routes>
      )}
      </BrowserRouter>
    </>
  );
}

export default App;
