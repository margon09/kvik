import styled from 'styled-components'

export const StyledFormContainer = styled.div`
  padding: 18%; 
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.mediaQueries.phone} {
    padding: 20% 10%;
  }
  ${({ theme }) => theme.mediaQueries.miniTablet} {
    padding: 18% 5%; 
  }
  ${({ theme }) => theme.mediaQueries.tablet} {
    padding: 18% 7%; 
  }
  ${({ theme }) => theme.mediaQueries.ultraWide} {
    padding: 10% 32%; 
  }
`
export const TaskText = styled.h3`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  ${({ theme }) => theme.mediaQueries.phone} {
    justify-content: center;
    align-items: center;
  }
`
export const TaskContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const Task = styled.div`
  width: 100%;
  margin: 3rem 0 5rem 0;
  padding-left: 10%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;

  ${({ theme }) => theme.mediaQueries.phone} {
    flex-direction: column;
    align-items: flex-start;
    margin: 1rem 0 1rem 0;
    padding-left: 0%;
  }
  ${({ theme }) => theme.mediaQueries.miniTablet} {
    padding-left: 0%;
  }
`
export const KvikImgContainer = styled.div`
  flex: 0.2;
  height: auto;
  padding: 0rem 0 3rem 3rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;

  ${({ theme }) => theme.mediaQueries.phone} {
    padding: 0; 
  }
  ${({ theme }) => theme.mediaQueries.miniTablet} {
    padding: 0rem 0 3rem 0rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
`
export const TaskFormContainer = styled.div`
  flex: 0.8;
  height: auto;
  padding: 3rem 0 3rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.phone} {
    padding: 2rem 0rem 2rem 0;
  }

`
export const TaskDescriptionInDanish = styled.div`
  flex: 0.5;
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  font-style: italic;

  span{
    font-weight: 600;
  }
`

export const AnswerInEnglish = styled.div`
  flex: 0.5;
  width: auto;
  height: auto;

  margin: 0rem 0 1rem 1.8rem;
  padding: 1rem;
`