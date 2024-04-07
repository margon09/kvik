import { useCallback, useEffect, useMemo, useState } from 'react'
import { 
StyledFormContainer, 
TaskText, 
TaskContainer,
KvikImgContainer,
TaskFormContainer,
Task,
TaskDescriptionInDanish,
AnswerInEnglish,
SpinnerContainer
} from './KvikForm.styles'
import KvikDefault from '../svgComponents/KvikDefault'
import Button from '../UI/button/Button'
import MessageBubble from '../UI/messageBubble/MessageBubble'
import AnswerInput from '../answerInput/AnswerInput'
import { InputState } from '../types/types'
import { getProblem, checkTheAnswer } from '../../services/apiClient'
import KvikCorrecting from '../svgComponents/KvikCorrecting'
import KvikCorrect from '../svgComponents/KvikCorrect'
import KvikWrongAnswerTwice from '../svgComponents/KvikWrongAnswerTwice'
import KvikWrongAnswer from '../svgComponents/KvikWrongAnswer'
import TryAgain from '../svgComponents/TryAgain'
import NextTask from '../svgComponents/NextTask'
import { ImSpinner } from "react-icons/im"
import React from 'react'
import { splitTextByInputs } from '../utils/textUtils'

const KvikForm = () => {
const [userAnswer, setUserAnswer] = useState('')
const [problem, setProblem] = useState({} as any)
const [answerState, setAnswerState] = useState(InputState.Default)
const [isLoading, setIsLoading] = useState(false)

const svgComponents = useMemo(() => ({
    [InputState.Default]: KvikDefault,
    [InputState.Error]: KvikWrongAnswer,
    [InputState.MoreError]: KvikWrongAnswerTwice,
    [InputState.Correct]: KvikCorrect,
    [InputState.Correcting]: KvikCorrecting
  }), [])
const CurrentSVGComponent = svgComponents[answerState]

  useEffect(() => {
    setIsLoading(true)
    getProblem(setIsLoading)
      .then(p => setProblem(p))
      .catch(error => {
        console.error('Error fetching problem:', error)
      })
  }, [])

  const checkAnswer = () => { 
    if(userAnswer === ''){
      return
    }
    if(answerState === InputState.MoreError || answerState === InputState.Correct ){
      setAnswerState(InputState.Default)
      setUserAnswer('')
      return
    }
    checkTheAnswer(userAnswer, setIsLoading)
    .then(res => res.isCorrect
      ? setAnswerState(InputState.Correct) 
      : setAnswerState((answerState === InputState.Error || answerState === InputState.Correcting) ?  InputState.MoreError : InputState.Error))  
  }

  const handleChange = useCallback((value: string) => {
    setUserAnswer(value)
  }, [])

  const splitText = useMemo(() => {
    return splitTextByInputs(problem?.problemText || '')
}, [problem?.problemText])

  if (isLoading) {
    return (
      <SpinnerContainer data-cy='loading-spinner' data-testid='loading-spinner'>
        <ImSpinner />
      </SpinnerContainer>
    )
  }
  
    return (
    <StyledFormContainer>
      {problem && <>
      <TaskText>{problem?.introText}</TaskText>
      <TaskContainer>
        <Task>
          <KvikImgContainer>
            <CurrentSVGComponent />
          </KvikImgContainer>
          <TaskFormContainer>
            <TaskDescriptionInDanish>
              <MessageBubble>{problem?.description}</MessageBubble>
            </TaskDescriptionInDanish>
            <AnswerInEnglish data-cy='problem-text'> 
              {splitText.map((part: string, index: number) => (
                <React.Fragment key={index}>
                  {part}
                  {index !== splitText.length - 1 && 
                  <AnswerInput
                    value={userAnswer}
                    onChange={handleChange}
                    answerState={answerState}
                    setAnswerState={setAnswerState}
                  />}
                </React.Fragment>
              ))}
            </AnswerInEnglish>
          </TaskFormContainer>
        </Task>
        <Button
          type='submit' 
          onClick={checkAnswer}
          answerState = {answerState}
        >
          {answerState === InputState.Correct && <><span className='nextTask'>Næste opgave</span><NextTask /></>}
          {answerState === InputState.MoreError && <><span className='tryAgain'>Prøv igen</span><TryAgain /></>}
          {answerState !== InputState.Correct && answerState !== InputState.MoreError && <span>Tjek mit svar</span>}
        </Button>
      </TaskContainer>
      </>}
    </StyledFormContainer>
  )

}

export default KvikForm