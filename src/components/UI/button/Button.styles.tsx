import styled from 'styled-components'
import { InputState } from '../../types/types'

interface StyledInputProps {
  $isFocused?: boolean
  $answerState?: string
}


export const StyledButton = styled.button<StyledInputProps>`
  width: 100%;
  min-height: 3rem;
  height: auto;
  padding: 0.7rem 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  outline: none;
  background: transparent;
  border: 2px solid ${({ theme, $answerState }) => $answerState === InputState.Correct 
                                                    ? theme.colors.success 
                                                    : $answerState === InputState.MoreError
                                                    ? theme.colors.danger
                                                    : theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: inset 0px 0px 0px 0 ${({ theme }) => theme.colors.borderColor},
                                  ${({ theme }) => theme.boxShadow}; 
  cursor: pointer;
  transition: box-shadow 0.3s linear;

  span.nextTask, span.tryAgain{
    padding-right: 1rem;
  }

  
  
  &:hover{
    box-shadow: inset 0px 0px 0px 1px ${({ theme, $answerState }) => $answerState === InputState.Correct 
                                                    ? theme.colors.success 
                                                    : theme.colors.borderColor}, 
                                                    ${({ theme }) => theme.boxShadowOnHover};
  }
  
  ${({ theme }) => theme.mediaQueries.miniTablet} {
    width: 40%;
    padding: 0.7rem 2.5rem;
  }
  ${({ theme }) => theme.mediaQueries.tablet} {
    width: 40%;
    padding: 0.7rem 2.5rem;
  }
  ${({ theme }) => theme.mediaQueries.laptop} {
    width: 35%;
    padding: 0.7rem 2.5rem;
  }
  ${({ theme }) => theme.mediaQueries.desktop} {
    width: 25%;
    padding: 0.7rem 2rem;
  }
  ${({ theme }) => theme.mediaQueries.wide} {
    width: 20%;
    padding: 0.7rem 2rem;
  }
  ${({ theme }) => theme.mediaQueries.ultraWide} {
    width: 25%;
  }
`