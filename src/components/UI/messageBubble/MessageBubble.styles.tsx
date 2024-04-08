import styled from 'styled-components'

interface StyledInputProps {
  isError?: boolean
}

export const StyledMessageContainer = styled.div `
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`
export const Triangle = styled.div<StyledInputProps>`
  width: 0;
  height: 0;
  border-top: 18px solid transparent;
  border-bottom: 18px solid transparent;
  border-right: 25px solid white;
  position: relative;
  left: 10px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 20px;
    height: 2px;
    background: ${({ theme, isError }) => (isError ? theme.colors.danger : theme.colors.input)};
    transform-origin: 0 0;
  }

  &::before {
    transform: translateY(-50%) rotate(-38deg);
  }

  &::after {
    transform: translateY(-50%) rotate(38deg);
  }
`
export const StyledMessageBubble = styled.div<StyledInputProps>`
  padding: 1rem;
  border: 2px solid ${({ theme, isError }) => (isError ? theme.colors.danger : theme.colors.input)};
  border-radius: ${({ theme }) => theme.borderRadiusMessage};
  color: ${({ theme, isError }) => (isError ? theme.colors.danger : 'inherit')};
`