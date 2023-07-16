import { GoogleOutlined } from '@ant-design/icons'
import { useGoogleLogin } from '@react-oauth/google'
import { Button, ButtonProps, Tooltip, message } from 'antd'
import { useMutation, useQueryClient } from 'react-query'
import { GoVerified } from 'react-icons/go'
import useError from '~/hooks/use-error'
import { useUser } from '~/hooks/use-user'
import { linkWithGoogle } from '~/queries/auth'
import { User } from '~/types/user'

type LinkWithGoogleProps = Omit<ButtonProps, 'onClick'>

export default function LinkWithGoogle(props: LinkWithGoogleProps) {
  const { user } = useUser()
  const { handleError } = useError()
  const queryClient = useQueryClient()

  const linkWithGoogleMutation = useMutation(linkWithGoogle, {
    onError: handleError,
    onSuccess: (user) => {
      queryClient.setQueryData<User>(['logged-in'], user)
      message.success('Account linked with google successfully!')
    },
  })

  const login = useGoogleLogin({
    onSuccess: ({ access_token }) => {
      linkWithGoogleMutation.mutate({ access_token })
    },
  })

  return user.isGoogleVerified ? (
    <Button icon={<GoogleOutlined />} className="flex items-center">
      <GoVerified className="text-green-700" />
    </Button>
  ) : (
    <Tooltip title="Link with google" placement="right">
      <Button
        {...props}
        onClick={login}
        icon={<GoogleOutlined />}
        loading={linkWithGoogleMutation.isLoading || props.loading}
        disabled={linkWithGoogleMutation.isLoading || props.disabled}
      />
    </Tooltip>
  )
}
