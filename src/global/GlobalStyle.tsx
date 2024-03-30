import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export default createGlobalStyle`
  ${reset}

  :root {
    font-size: 1rem;
  }
    
  html, body{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    width: 100%;
    height: auto;
    font-size: 100%; 
    font-family: 'Roboto', sans-serif;
    font-size: 1.1rem;
    vertical-align: baseline;
    line-height: 1.25;
  }

  h1, h2, h3 {
    font-family: 'Poppins', sans-serif;
  }

  h1{
    padding: 2rem;
    font-size: 3rem;
    font-weight: 700;
    line-height: 2.5;
    margin-bottom: 1rem;

    ${({ theme }) => theme.mediaQueries.phone} {
      font-size: 2rem;
    }
  }
  h2{
    padding: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 2;
    margin-bottom: 1rem;

    ${({ theme }) => theme.mediaQueries.phone} {
      font-size: 1.3rem;
    }
  }
  h3{
    font-size: 1.15rem;
    font-weight: 600;
    line-height: 1.25;
    margin-bottom: 0.5rem;
    
    ${({ theme }) => theme.mediaQueries.phone} {
      font-size: 1rem;
    }
  }

  b{
    font-weight: bold;
  }

  div{
    ${({ theme }) => theme.mediaQueries.phone} {
      font-size: 0.97rem;
    }
  }
`