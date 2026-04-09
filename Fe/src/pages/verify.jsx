import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { notification, Result, Button, Spin } from 'antd';
import axios from '../util/axios.customize'; // Sử dụng axios đã cấu hình của bạn

const VerifyPage = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('pending'); // pending, success, error
    const navigate = useNavigate();

    const token = searchParams.get("token");

    useEffect(() => {
        const verify = async () => {
            if (token) {
                try {
                    // Gọi API backend để xác thực
                    const res = await axios.get(`/v1/api/verifyEmail?token=${token}`);

                    if (res && res.EC === 0) {
                        setStatus('success');
                        notification.success({
                            message: 'Xác thực thành công',
                            description: res.EM
                        });
                        // setTimeout(() => {
                        //     navigate('/login');
                        // }, 3000);
                    } else {
                        setStatus('error');
                        notification.error({
                            message: 'Xác thực thất bại',
                            description: res.EM || "Token không hợp lệ"
                        });
                    }
                } catch (error) {
                    setStatus('error');
                    console.error("Verify error:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        verify();
    }, [token, navigate]);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '100px' }}><Spin size="large" /> <p>Đang xác thực tài khoản...</p></div>;

    return (
        <div style={{ marginTop: '50px' }}>
            {status === 'success' ? (
                <Result
                    status="success"
                    title="Xác thực tài khoản thành công!"
                    subTitle="Giờ đây bạn đã có thể đăng nhập và sử dụng dịch vụ."
                    extra={[
                        <Button type="primary" key="login" onClick={() => navigate('/login')}>
                            Đăng nhập ngay
                        </Button>
                    ]}
                />
            ) : (
                <Result
                    status="error"
                    title="Xác thực thất bại"
                    subTitle="Đường dẫn đã hết hạn hoặc không hợp lệ. Vui lòng thử lại."
                    extra={[
                        <Button type="primary" key="home" onClick={() => navigate('/')}>
                            Quay lại trang chủ
                        </Button>
                    ]}
                />
            )}
        </div>
    );
};

export default VerifyPage;