import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from './util/axios.customize'
import { useEffect } from 'react'
import Header from './components/layout/header'
import { Outlet } from 'react-router-dom'

function App() {
  useEffect(() => {
    const fetchHelloWord = async () => {
      const res = await axios.get(`/v1/api/`)
      console.log(">>> check data: ", res)
    }
    fetchHelloWord()
  }, [])

  return (
    <div>
      <Header />
      <Outlet />
    </div>

  )
}

export default App
