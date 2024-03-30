import React from 'react'
import { StyledButton } from './Button.styles'

interface Props {
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  children: React.ReactNode
  isFocused?: boolean
  answerState?: string
}

const Button = ({ onClick, type = "button", children, isFocused, answerState }: Props) => {
  return (
    <StyledButton 
      data-cy='button' 
      onClick={onClick} 
      type={type} 
      $isFocused={isFocused} 
      $answerState={answerState}
    >
      {children}
    </StyledButton>
  )
}

export default Button