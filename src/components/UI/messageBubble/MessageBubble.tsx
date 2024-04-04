import { StyledMessageContainer, Triangle, StyledMessageBubble  } from "./MessageBubble.styles"
import Parser from 'html-react-parser'

interface Props {
  children: string
}

const MessageBubble = ({children}: Props) => {
  return (
    <StyledMessageContainer>
      <Triangle />
      <StyledMessageBubble>{children && Parser(children)}
      </StyledMessageBubble>
    </StyledMessageContainer>
  )
}

export default MessageBubble