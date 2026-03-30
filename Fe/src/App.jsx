import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from './util/axios.customize'
import { useEffect } from 'react'
import Header from './components/layout/header'
import { Outlet } from 'react-router-dom'
import AuthContext from './components/context/auth.context'
import { Spin } from 'antd';

function App() {

  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);

  useEffect(() => {

    const fetchAccount = async () => {

      setAppLoading(true);

      const res = await axios.get(`/v1/api/account`)
      if (res && !res.message) {
        setAuth({
          isAuthenticated: true,
          user:
          {
            email: res.email,
            name: res.name,
          }
        })
      }

      setAppLoading(false);
      console.log(">>> check data: ", res)
    }
    fetchAccount()
  }, [])

  return (
    <div>
      {appLoading === true ?
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}>
          <Spin />
        </div>
        :
        <>
          <Header />
          <Outlet />
        </>
      }
    </div>

  )
}

export default App
