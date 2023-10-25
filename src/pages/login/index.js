import { React, useEffect, useState } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { fetchLogin } from '../../services/restaurant_services';
import './login.scss';
import { Link, Navigate, useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
    //AES
    const [userName, setUserName] = useState();
    const [passWord, setPassWord] = useState();

    const dangNhap = async () => {
        await fetchLogin({
            username: userName,
            password: passWord,
        })
            .then((response) => {
                console.log(response);
                // Nhận về thông tin user và accesstoken

                // lưu access token vào localstorage, ( lưu ở cookies thì hợp lý hơn)
                localStorage.setItem('access_token', response.access_token);

                localStorage.setItem('user_info', JSON.stringify(response.user));
                notification.open({
                    type: 'success',
                    message: 'Đăng nhập thành công',
                    description: '',
                    duration: 2,
                });

                setTimeout(() => {
                    if (response.user.role == '1') {
                        navigate('/admin');
                    } else {
                        navigate('/home');
                    }
                }, 1000);
            })
            .catch((error) => {
                notification.open({
                    type: 'error',
                    message: 'Đăng nhập thất bại',
                    description: error.response.data.error,
                    duration: 2,
                });
            });
    };
    return (
        <div className="mt-5 d-flex justify-content-center">
            <div className="login">
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
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                        />
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
                        <Input.Password
                            onChange={(e) => {
                                setPassWord(e.target.value);
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <button className="button_login" type="primary" onClick={dangNhap}>
                            Đăng nhập
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;
