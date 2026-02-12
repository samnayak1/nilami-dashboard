import { Button, Form, Input } from "antd";

import { useLogin } from "../hooks/LoginUserHook";
import { useAuthActions } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import type { LoginRequestType } from "../types";

function LoginForm() {
    const { mutate, isPending } = useLogin();
    const { setAuth } = useAuthActions();
    const navigate = useNavigate();
    const onFinish = (values: LoginRequestType) => {
        mutate(values, {
            onSuccess: (response) => {

                setAuth({
                    accessToken: response.accessToken,
                    refreshToken: response.refreshToken,
                    idToken: response.idToken,
                    isAuthenticated: true,
                    expiresAt: response.expiresIn
                });


                navigate('/dashboard');
            }
        });
    };
    return (
        <div className="w-full max-w-md mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8 text-center">
                Login
            </h1>

            <Form
                name="basic"
                layout="vertical"
                requiredMark={false}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                className="flex flex-col gap-4"
            >
                <Form.Item<LoginRequestType>
                    label={<span className="text-main-text font-medium">Email</span>}
                    name="email"
                    className="mb-0"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input className="h-10" />
                </Form.Item>

                <Form.Item<LoginRequestType>
                    label={<span className="text-main-text font-medium">Password</span>}
                    name="password"
                    className="mb-0"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password className="h-10" />
                </Form.Item>

                <Form.Item className="mt-4">
                    <Button
                        loading={isPending}
                        type="primary"
                        htmlType="submit"
                        className="w-full h-10"
                    >
                        Log In
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default LoginForm;