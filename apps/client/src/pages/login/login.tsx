import { UserAddOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { useAuthContext } from '~/hooks/use-auth'

export default function Login() {
  const { loginMutation } = useAuthContext()

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <div className="bg-white p-8 rounded space-y-4 w-[30rem]">
        <div className="text-2xl font-bold">
          Signup to <span className="text-primary">Mail Bridge.</span>
        </div>

        <Form
          layout="vertical"
          onFinish={(values) => {
            loginMutation.mutate(values)
          }}
          disabled={loginMutation.isLoading}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please input a valid email!' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            icon={<UserAddOutlined />}
            disabled={loginMutation.isLoading}
            loading={loginMutation.isLoading}
          >
            Signup
          </Button>
        </Form>
      </div>
    </div>
  )
}
