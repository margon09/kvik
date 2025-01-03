import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { StyledAnswerInput, StyledInput, Icon } from "./AnswerInput.styles"
import Error from "../svgComponents/Error"
import { InputState } from "../types/types"
import Correct from "../svgComponents/Correct"

interface Props {
  value: string
  onChange: (value: string) => void
  answerState?: string
  setAnswerState: Dispatch<SetStateAction<InputState>>
}

const AnswerInput = ({ value, onChange, answerState, setAnswerState }: Props) => {
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const [inputWidth, setInputWidth] = useState("5rem")

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value.replace(/[^A-Za-z\s]/g, '')
    setInputValue(newText)
    onChange(newText)
  }

  const handleBlur = () => {
    if (inputValue.trim() === '') {
      setInputWidth('5rem')
    }
    setIsFocused(false)
  }

  const handleFocus = () => {
    setIsFocused(true)
    if(answerState === InputState.Error){
      setAnswerState(InputState.Correcting)
    }
  }

  return (
    <StyledAnswerInput>
      <StyledInput 
        data-cy='input'
        data-testid='input'
        onFocus={handleFocus} 
        onBlur={handleBlur}
        $isFocused={isFocused}
        $hasImage={!isFocused && !value}
        $hasText={!!inputValue.trim()}
        value={value ? inputValue : ''}
        onChange={handleChange}
        style={{ width: inputWidth }}
        $answerState={answerState}
        disabled={answerState === InputState.MoreError || answerState === InputState.Correct}
      />
      <Icon >
          {answerState === InputState.MoreError && <span data-testid='error-icon'><Error /></span>}
          {answerState === InputState.Correct && <span data-testid='correct-icon'><Correct /></span>}
      </Icon>
    </StyledAnswerInput>
  )
}

export default AnswerInput