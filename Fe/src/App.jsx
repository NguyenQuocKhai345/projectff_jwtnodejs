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
import AppFooter from './components/layout/footer'

function App() {

  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      const token = localStorage.getItem("access_token");

      // TRƯỜNG HỢP 1: Không có token -> Không gọi API, tắt loading luôn
      if (!token) {
        setAppLoading(false);
        return;
      }

      // TRƯỜNG HỢP 2: Có token -> Gọi API kiểm tra
      setAppLoading(true);
      try {
        const res = await axios.get(`/v1/api/account`);
        if (res && res.email) { // Nếu BE trả về user hợp lệ
          setAuth({
            isAuthenticated: true,
            user: {
              email: res.email,
              name: res.name,
              role: res.role || ""
            }
          });
        } else {
          // Nếu BE trả về lỗi (như token hết hạn)
          localStorage.removeItem("access_token");
        }
      } catch (error) {
        // Khi API lỗi 401, xóa token rác để lần sau mở trang không bị gọi lại
        localStorage.removeItem("access_token");
        console.log(">>> Check token error: ", error);
      } finally {
        // Dù thành công hay lỗi cũng phải tắt xoay xoay
        setAppLoading(false);
      }
    }
    fetchAccount();
  }, []);
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
          <AppFooter />
        </>
      }
    </div>

  )
}

export default App
