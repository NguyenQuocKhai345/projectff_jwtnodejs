import React, { useContext, useState } from 'react';
import { SettingOutlined, HomeOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth.context';

const Header = () => {

    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    console.log(">>>check auth:", auth)


    const handleMenuClick = (e) => {
        console.log('click ', e);
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
    return <Menu onClick={handleMenuClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Header;