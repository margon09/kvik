import styled from 'styled-components'

export const StyledMessageContainer = styled.div `
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`
export const Triangle = styled.div `
  width: 0;
  height: 0;
  // height
  border-top: 18px solid transparent;
  border-bottom: 18px solid transparent;
  // base
  border-right: 25px solid white;
  position: relative;
  // covers rect
  left: 10px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 20px;
    // line height
    height: 2px;
    background: ${({ theme }) => theme.colors.input};
    transform-origin: 0 0;
  }

  &::before {
    // line upwards
    transform: translateY(-50%) rotate(-38deg);
  }

  &::after {
    // line downwards
    transform: translateY(-50%) rotate(38deg);
  }
`
export const StyledMessageBubble = styled.div `
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.input};
  border-radius: ${({ theme }) => theme.borderRadiusMessage};
`