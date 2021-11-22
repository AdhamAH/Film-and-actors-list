import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { render } from '@testing-library/react'
import theme from '../helpers/theme'

const Providers = ({ children }: { children: JSX.Element }) => {
  return ThemeProvider({
    theme: theme,
    children: children,
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const customRender = (
  ui: React.ReactElement,
  options: Record<string, unknown>
) => render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
