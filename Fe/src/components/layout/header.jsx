// import React, { useContext, useState } from 'react';
// import { SettingOutlined, HomeOutlined, UsergroupAddOutlined } from '@ant-design/icons';
// import { Menu } from 'antd';
// import { Link, useNavigate } from 'react-router-dom';
// import AuthContext from '../context/auth.context';
// import logo from '../../assets/images/logo.png';

// const Header = () => {

//     const navigate = useNavigate();
//     const { auth, setAuth } = useContext(AuthContext);
//     console.log(">>>check auth:", auth)


//     const handleMenuClick = (e) => {
//         console.log('click ', e);
//         if (e.key === 'logout') {
//             localStorage.removeItem("access_token");
//             setAuth({
//                 isAuthenticated: false,
//                 user: {
//                     email: "",
//                     name: "",
//                     role: ""
//                 }
//             });
//             navigate("/");
//             return;
//         }
//         setCurrent(e.key);
//     };

//     const items = [
//         {
//             label: <Link to="/">Home Page</Link>,
//             key: 'home',
//             icon: <HomeOutlined />,
//         },
//         ...(auth?.isAuthenticated && auth?.user?.role === 'ADMIN' ? [{
//             label: <Link to="/user">Users</Link>,
//             key: 'user',
//             icon: <UsergroupAddOutlined />,
//         }] : []),
//         {
//             label: `Welcome ${auth?.user?.email ?? ""}`,
//             key: 'SubMenu',
//             icon: <SettingOutlined />,
//             children: [
//                 ...(auth?.isAuthenticated ? [
//                     {
//                         label: 'Đăng Xuất',
//                         key: 'logout',
//                     },
//                 ] : [
//                     {
//                         label: <Link to="/login">Đăng Nhập</Link>,
//                         key: 'login',
//                     },
//                     {
//                         label: <Link to="/register">Đăng Ký</Link>,
//                         key: 'register',
//                     },
//                 ]),
//             ],
//         },
//     ];
//     const [current, setCurrent] = useState('home');
//     return (
//         <div>
//             {/* 🔥 HEADER TOP (logo + slogan) */}
//             <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 padding: '10px 20px',
//                 background: '#fff',
//                 borderBottom: '1px solid #f0f0f0'
//             }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                     <img
//                         src={logo}
//                         alt="logo"
//                         style={{ height: 80 }}
//                     />
//                     <div style={{
//                         fontSize: 25,
//                         fontWeight: 500,
//                         color: '#1890ff'
//                     }}>
//                         Sức khỏe của bạn, Ưu tiên của chúng tôi
//                     </div>
//                 </div>
//             </div>

//             <Menu
//                 onClick={handleMenuClick}
//                 selectedKeys={[current]}
//                 mode="horizontal"
//                 items={items}
//             />
//         </div>);
// };
// export default Header;



import React, { useContext, useState } from 'react';
import {
    SettingOutlined,
    HomeOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth.context';
import logo from '../../assets/images/logo.png';

const Header = () => {

    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    const handleMenuClick = (e) => {
        if (e.key === 'logout') {
            localStorage.removeItem("access_token");
            setAuth({
                isAuthenticated: false,
                user: {
                    email: "",
                    name: "",
                    role: ""
                }
            });
            navigate("/");
            return;
        }
        setCurrent(e.key);
    };

    const items = [
        {
            label: <Link to="/">Home Page</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        ...(auth?.isAuthenticated && auth?.user?.role === 'ADMIN' ? [{
            label: <Link to="/user">Users</Link>,
            key: 'user',
            icon: <UsergroupAddOutlined />,
        }] : []),
        ...(auth?.isAuthenticated && auth?.user?.role === 'PATIENT' ? [{
            label: <Link to="/createAppointment">Đặt lịch</Link>,
            key: 'appointment',
            icon: <UsergroupAddOutlined />,
        }] : []),
        {
            label: `Welcome ${auth?.user?.email ?? ""}`,
            key: 'SubMenu',
            icon: <SettingOutlined />,
            children: [
                ...(auth?.isAuthenticated ? [
                    {
                        label: 'Đăng Xuất',
                        key: 'logout',
                    },
                ] : [
                    {
                        label: <Link to="/login">Đăng Nhập</Link>,
                        key: 'login',
                    },
                    {
                        label: <Link to="/register">Đăng Ký</Link>,
                        key: 'register',
                    },
                ]),
            ],
        },
    ];

    const [current, setCurrent] = useState('home');

    return (
        <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
            <div style={{
                background: 'linear-gradient(90deg, #e6f7ff, #ffffff)',
                borderBottom: '1px solid #f0f0f0'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '10px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Link to="/">
                            <img src={logo} alt="logo" style={{ height: 60 }} />
                        </Link>
                        <div style={{
                            fontSize: 18,
                            fontWeight: 600,
                            color: '#1677ff'
                        }}>
                            Bệnh viện CarePlus - Sức khỏe của bạn, Ưu tiên của chúng tôi
                        </div>
                    </div>
                </div>
            </div>

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <Menu
                    onClick={handleMenuClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
                />
            </div>
        </div>
    );
};

export default Header;
