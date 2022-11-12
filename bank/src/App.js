import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login"
import LoginForm from "./LoginForm"
import Main from "./Main"
import SignupForm from './SignupForm'
import TransactionForm from './TransactionForm'
import DepositMoney from './DepositMoney'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/loginform" element={<LoginForm/>} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/transaction" element={<TransactionForm />}/>
        <Route path="/deposit" element={<DepositMoney />}/>
        <Route path="" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App