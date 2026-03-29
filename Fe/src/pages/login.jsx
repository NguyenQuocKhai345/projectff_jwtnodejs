import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { loginApi } from '../util/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { email, password } = values;

        const res = await loginApi(email, password);

        // debugger;

        if (res && res.EC === 0) {
            localStorage.setItem("access_token", res.access_token); // lưu token vào localStorage
            notification.success({
                message: 'Login successfully',
                description: "Success"
            });
            navigate('/');

        } else {
            notification.error({
                message: 'Login failed',
                description: res?.EM ?? "Error"
            });
        }
        //debugger;

        console.log('Success:', res);
        // console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div style={{ margin: 50 }}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item

                >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
}

export default LoginPage;