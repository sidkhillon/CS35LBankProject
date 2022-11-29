import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "./style/App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./Main"
import NavbarComponent from "./Navbar"
import Pay from "./Pay"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm.js"
import DepositMoney from "./DepositMoney"
import WithdrawMoney from './WithdrawMoney'

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavbarComponent />
        <Routes>
          <Route path="/loginform" element={<LoginForm/>} />
          <Route path="/pay" element={<Pay/>} />
          <Route path="/deposit" element={<DepositMoney />} />
          <Route path="/withdraw" element={<WithdrawMoney />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="" element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App