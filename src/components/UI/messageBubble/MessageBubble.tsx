import { StyledMessageContainer, Triangle, StyledMessageBubble  } from "./MessageBubble.styles"
import Parser from 'html-react-parser'

interface Props {
  children: string
}

const MessageBubble = ({children}: Props) => {
  return (
    <StyledMessageContainer data-testid='message-bubble'>
      <Triangle />
      <StyledMessageBubble>{children && Parser(children)}
      </StyledMessageBubble>
    </StyledMessageContainer>
  )
}

export default MessageBubble