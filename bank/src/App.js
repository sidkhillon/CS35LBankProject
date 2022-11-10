import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login"
import Main from "./Main"
import NavbarComponent from "./Navbar"

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavbarComponent />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="" element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App