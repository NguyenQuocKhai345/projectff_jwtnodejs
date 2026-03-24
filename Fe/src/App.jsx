import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from './util/axios.customize'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const fetchHelloWord = async () => {
      const res = await axios.get(`/v1/api/`)
      console.log(">>> check data: ", res)
    }
    fetchHelloWord()
  }, [])
}

export default App
