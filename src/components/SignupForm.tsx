import { Button, Form, Input, InputNumber, message, Select } from "antd";

import { useSignup } from "../hooks/SignupUserHook";
import type { SignUpRequestType } from "../types";

function SignUpForm() {


    const [form] = Form.useForm<SignUpRequestType>();
    const { mutate, isPending } = useSignup();
    const onFinish = (values: SignUpRequestType) => {
        mutate(values);

        message.success('Account created!');


    }

    const genderOptions = [
        { label: 'Male', value: 'MALE' },
        { label: 'Female', value: 'FEMALE' },
        { label: 'Non-Binary', value: 'OTHER' },
    ];
    return (
        <div className="w-full max-w-lg mx-auto p-8">
         
            <h1 className="text-3xl font-bold mb-8 text-center">
                Create Account
            </h1>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ gender: genderOptions[0].value }}
                requiredMark={false}
                className="flex flex-col gap-2" 
            >
               
                <Form.Item
                    label={<span className="font-medium text-main-text">Name</span>}
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input placeholder="Enter your full name" className="h-10" />
                </Form.Item>

          
                <Form.Item
                    label={<span className="font-medium text-main-text">Email</span>}
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                >
                    <Input placeholder="email@example.com" className="h-10" />
                </Form.Item>

        
                <Form.Item
                    label={<span className="font-medium text-main-text">Password</span>}
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        { min: 8, message: 'Password must be at least 8 characters.' },
                        { pattern: /(?=.*[0-9])/, message: 'Password must have at least one numeric character!' }
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Min 8 characters" className="h-10" />
                </Form.Item>

      
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label={<span className="font-medium text-main-text">Age</span>}
                        name="age"
                        rules={[
                            { required: true, message: 'Please input your age!' },
                            { type: 'number', min: 18, max: 100, message: 'Age must be 18-100' }
                        ]}
                    >
                        <InputNumber placeholder="25" className="w-full h-10 flex items-center hover:border-pink-red focus:border-pink-red" />
                    </Form.Item>

                    <Form.Item
                        label={<span className="font-medium text-main-text">Gender</span>}
                        name="gender"
                        rules={[{ required: true, message: 'Please select your gender!' }]}
                    >
                        <Select
                            placeholder="Select"
                            options={genderOptions}
                            className="h-10"
                        />
                    </Form.Item>
                </div>

          
                <Form.Item
                    label={<span className="font-medium text-main-text">Address</span>}
                    name="address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input.TextArea
                        placeholder="Enter your full address"
                        rows={3}
                     
                    />
                </Form.Item>

                <Form.Item className="mt-6">
                    <Button
                        type="primary"
                        loading={isPending}
                        htmlType="submit"
                        className="w-full h-12"
                    >
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
}

export default SignUpForm;