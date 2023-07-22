import { ConfigProvider } from 'antd'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

type ThemeConfig = React.ComponentProps<typeof ConfigProvider>['theme']

export const ANTD_THEME: ThemeConfig = {
  token: {
    fontSize: 16,
    fontFamily: ['Inter', ...defaultTheme.fontFamily.sans].join(', '),

    colorPrimary: '#6D3EF4',
    colorText: 'black',

    colorBorder: '#6D3EF4',

    colorError: colors.red['500'],
    colorWarning: colors.yellow['600'],
    colorSuccess: colors.green['600'],

    borderRadius: 3,
  },
  components: {
    Form: {
      fontSize: 14,
      margin: 32,
    },
  },
}
