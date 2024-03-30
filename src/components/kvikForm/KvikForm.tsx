import { useEffect, useState } from 'react'
import { 
StyledFormContainer, 
TaskText, 
TaskContainer,
KvikImgContainer,
TaskFormContainer,
Task,
TaskDescriptionInDanish,
AnswerInEnglish
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


const KvikForm = () => {
const [userAnswer, setUserAnswer] = useState('')
const [problem, setProblem] = useState({} as any)
const [answerState, setAnswerState] = useState(InputState.Default)


  useEffect(() => {
    getProblem().then(p => setProblem(p))
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
    checkTheAnswer(userAnswer).then(res => res.correctAnswer.input0 === userAnswer 
      ? setAnswerState(InputState.Correct) 
      : setAnswerState(answerState === InputState.Error ?  InputState.MoreError : InputState.Error))  
  }

    return (
    <StyledFormContainer>
      {problem && <>
      <TaskText>{problem?.introText}</TaskText>
      <TaskContainer>
        <Task>
          <KvikImgContainer>
            {answerState === InputState.Default && <KvikDefault />}
            {answerState === InputState.Error && <KvikWrongAnswer />}
            {answerState === InputState.MoreError && <KvikWrongAnswerTwice />}
            {answerState === InputState.Correct && <KvikCorrect />}
            {answerState === InputState.Correcting && <KvikCorrecting />}
          </KvikImgContainer>
          <TaskFormContainer>
            <TaskDescriptionInDanish>
              <MessageBubble>{problem?.description}</MessageBubble>
            </TaskDescriptionInDanish>
            <AnswerInEnglish> {problem?.problemText && problem?.problemText.substring(0, problem?.problemText.indexOf("{{input0}}"))}
              <AnswerInput 
                value={userAnswer} 
                onChange={setUserAnswer}
                answerState = {answerState}
                setAnswerState = {setAnswerState}
              /> 
              {problem?.problemText && problem.problemText.substring(problem.problemText.indexOf("{{input0}}") + "{{input0}}".length)}</AnswerInEnglish>
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