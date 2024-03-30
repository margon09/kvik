import styled from 'styled-components'
import pen from '../../assets/images/Blyant.png'
import { InputState } from '../types/types'

interface StyledInputProps {
  $hasError?: boolean
  $isFocused?: boolean
  $hasImage?: boolean
  $hasText: boolean
  $answerState?: string
}

export const StyledAnswerInput = styled.div`
  display: inline-block;
  width: auto;
  margin: 0;
  padding: 0;
  position: relative;
`

export const Icon = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);

  svg{
    margin-top: 0.4rem;
  }
`

export const StyledInput = styled.input<StyledInputProps>`
  box-sizing: border-box;
  width: ${({ $hasImage }) => ($hasImage ? '5rem' : '100%')};
  min-width: ${({ $answerState }) => ($answerState === InputState.Correct || $answerState === InputState.MoreError) 
                                      ? '7rem' : '5rem'};
  max-width: 7rem;
  min-height: 3rem;
  padding-top: 0.3rem !important;
  padding-bottom: 0.3rem !important;
  padding-left: 0.5rem !important;
  padding-right: 0.3rem !important;
  padding-right: ${({ $answerState }) => ($answerState === InputState.Correct || $answerState === InputState.MoreError) 
                                        ? '2rem!important' : '0.3rem!important'};
  margin: 0 0.5rem;
  font-size: 1.2rem;
  border: 2px solid ${({ theme, $answerState }) => $answerState === InputState.Default 
                                                                      ? theme.colors.inputDefaultBorder 
                                                                      : $answerState === InputState.Correct 
                                                                              ? theme.colors.success
                                                                              : theme.colors.danger};
  box-shadow:  ${({ theme, $answerState }) => $answerState === InputState.Default 
                                                                      ? theme.inputBoxShadow
                                                                      : ($answerState === InputState.Correct ||
                                                                        $answerState === InputState.Error ||
                                                                        $answerState === InputState.MoreError)
                                                                              ? 'none'
                                                                              : theme.inputBoxShadow};
  border-radius: ${({ theme }) => theme.borderRadiusMessage};

  padding: 0.8rem;
  background-image: ${({$hasImage }) => $hasImage ? `url(${pen})` : 'none'};
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 70%;
  background-origin: content-box;
  background-clip: padding-box; 

  background-color:  ${({ theme, $answerState }) => $answerState === InputState.Correct 
                                                  ? theme.colors.successBackground 
                                                  : $answerState === InputState.MoreError
                                                  ? theme.colors.dangerBackground
                                                  : 'transparent'};

  &:focus {
    font-size: 1.2rem;
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.input};
    box-shadow: ${({ theme }) => `inset 0 0 0 1px ${theme.colors.input}`}
    
    ${({ theme }) => theme.mediaQueries.phone} {
      font-size: 1rem;
    }
  }

  ${({ theme }) => theme.mediaQueries.phone} {
    min-height: 2rem;
  }
`