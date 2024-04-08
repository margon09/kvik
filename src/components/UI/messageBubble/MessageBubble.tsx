import { StyledMessageContainer, Triangle, StyledMessageBubble  } from "./MessageBubble.styles"
import Parser from 'html-react-parser'

interface Props {
  children: string
  isError: boolean
}

const MessageBubble = ({children, isError }: Props) => {
  return (
    <StyledMessageContainer data-testid='message-bubble'>
      <Triangle isError={isError}/>
      <StyledMessageBubble isError={isError}>
        {children && Parser(children)}
      </StyledMessageBubble>
    </StyledMessageContainer>
  )
}

export default MessageBubble