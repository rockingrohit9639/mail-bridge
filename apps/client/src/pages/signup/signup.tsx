import { UserAddOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { useMutation, useQueryClient } from 'react-query'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthContext } from '~/hooks/use-auth'
import useError from '~/hooks/use-error'
import { signup } from '~/queries/auth'
import { ENV } from '~/utils/env'

export default function Signup() {
  const { handleError } = useError()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') ?? '/'

  const signupMutation = useMutation(signup, {
    onError: handleError,
    onSuccess: ({ user, accessToken }) => {
      // saving the token
      localStorage.setItem(ENV.VITE_BEARER_TOKEN_KEY, accessToken)

      // setting the user in state
      queryClient.setQueryData(['logged-in'], user)

      navigate('/dashboard', { replace: true })
    },
  })

  if (user) {
    return <Navigate to={{ pathname: redirectTo }} replace />
  }

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <div className="bg-white p-8 rounded space-y-4 w-[30rem] shadow">
        <div className="text-2xl font-bold">
          Signup to <span className="text-primary">Mail Bridge.</span>
        </div>

        <Form
          layout="vertical"
          onFinish={(values) => {
            signupMutation.mutate(values)
          }}
          disabled={signupMutation.isLoading}
        >
          <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input placeholder="Full Name" />
          </Form.Item>

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
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Please enter at least 6 characters.' },
              { max: 20, message: 'Please enter at most 20 characters.' },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            icon={<UserAddOutlined />}
            disabled={signupMutation.isLoading}
            loading={signupMutation.isLoading}
          >
            Signup
          </Button>
        </Form>

        <div className="flex item-center justify-center gap-2">
          Already have an account{' '}
          <Link className="text-primary" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
