
import './App.css'
import Loginpage from './Components/Loginpage/Loginpage'
import { Route, Routes } from 'react-router-dom'
import Registration from './Components/Registration/Registration'
import Homepage from './Components/Homepage/Homepage'
import { ToastContainer } from 'react-toastify'

function App() {
  

  return (
    <>
    <Routes>
    <Route path="/" element={<Loginpage/>}/>
    <Route path="/Registratsion" element={<Registration/>}/>
    <Route path="/Homepage" element={<Homepage/>}/>
    </Routes>
    <ToastContainer/>
    </>
  )
}

export default App
