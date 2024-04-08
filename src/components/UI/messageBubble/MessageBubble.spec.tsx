import { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import MessageBubble from './MessageBubble'
import { theme } from '../../../global/Theme'
import { ThemeProvider } from 'styled-components'

const renderWithTheme = (component: ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('MessageBubble', () => {
  it('renders correctly with children', () => {
    renderWithTheme(<MessageBubble isError>Some message</MessageBubble>)
    expect(screen.getByTestId('message-bubble')).toBeInTheDocument()
    expect(screen.getByTestId('message-bubble')).toHaveTextContent('Some message')
  })
})