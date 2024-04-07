import { ReactNode } from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import AnswerInput from './AnswerInput'
import { theme } from '../../global/Theme'
import { ThemeProvider } from 'styled-components'
import { InputState } from '../types/types'

const renderWithTheme = (component: ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

const PROPS = {
  value: 'dog', 
  onChange: jest.fn(),
  answerState: InputState.Default,
  setAnswerState: jest.fn()
}

describe('Button', () => {
  it('renders correctly with children', () => {
    renderWithTheme(<AnswerInput {...PROPS}/>)
    expect(screen.getByTestId('input')).toBeInTheDocument()
  })

  it('calls onChange handler with correct value when input changes', () => {
    renderWithTheme(<AnswerInput {...PROPS}/>)
    const inputElement = screen.getByTestId('input')
    fireEvent.change(inputElement, { target: { value: 'cat' } })
    expect(PROPS.onChange).toHaveBeenCalledWith('cat')
  })

  it('calls onFocus handler when input is focused', () => {
    renderWithTheme(<AnswerInput {...PROPS}/>)
    const inputElement = screen.getByTestId('input')
    fireEvent.focus(inputElement)
    expect(inputElement).toHaveStyle('border-color: ' + theme.colors.inputDefaultBorder)
  })

  it('calls onBlur handler when input loses focus', () => {
    renderWithTheme(<AnswerInput {...PROPS}/>)
    const inputElement = screen.getByTestId('input')
    fireEvent.focus(inputElement)
    fireEvent.blur(inputElement)
    expect(inputElement).toHaveStyle('border-color: ' + theme.colors.inputDefaultBorder)
  })

  it('displays correct icon when answerState is "Correct"', () => {
    const propsWithCorrectState = { ...PROPS, answerState: InputState.Correct }
    renderWithTheme(<AnswerInput {...propsWithCorrectState}/>)
    expect(screen.getByTestId('correct-icon')).toBeInTheDocument()
  })

  it('displays error icon when answerState is "MoreError"', () => {
    const propsWithErrorState = { ...PROPS, answerState: InputState.MoreError }
    renderWithTheme(<AnswerInput {...propsWithErrorState}/>)
    expect(screen.getByTestId('error-icon')).toBeInTheDocument()
  })
})
