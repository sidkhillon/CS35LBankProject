import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "./style/App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login"
import Main from "./Main"
import NavbarComponent from "./Navbar"
import Pay from "./Pay"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm.js"

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavbarComponent />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/loginform" element={<LoginForm/>} />
          <Route path="/pay" element={<Pay/>} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="" element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App