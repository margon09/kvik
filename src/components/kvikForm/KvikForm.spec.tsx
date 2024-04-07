import { ReactNode } from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import KvikForm from './KvikForm'
import { theme } from '../../global/Theme'
import { ThemeProvider } from 'styled-components'

const renderWithTheme = (component: ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('Button', () => {
  beforeEach(() => {
    jest.mock('../../services/apiClient', () => ({
      getProblem: jest.fn(() => Promise.resolve({
        introText: 'Skriv det rigtige ord i oversættelsen.',
        description: 'Kvik er en sød hund. Han elsker at lære nye ting',
        problemText: 'Kvik is a nice {{input0}}. He loves to learn new things.'
      })),
      checkTheAnswer: jest.fn(() => Promise.resolve({ isCorrect: true }))
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('displays loading spinner when isLoading is true', () => {
    renderWithTheme(<KvikForm />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('renders the correct intro text', async () => {
    const introText = 'Skriv det rigtige ord i oversættelsen.'

    renderWithTheme(<KvikForm />)

    const introTextElement = await screen.findByText(introText)
    expect(introTextElement).toBeInTheDocument()
  })

  it('renders the correct task description', async () => {
    renderWithTheme(<KvikForm />)
    
    const taskDescriptionElement = await screen.findByText(/Kvik er en sød/i)
    expect(taskDescriptionElement).toBeInTheDocument()

    const boldElement = await screen.findByText(/hund/i)
    expect(boldElement).toBeInTheDocument()
    expect(boldElement.closest('b')).not.toBeNull()
  })

  it('should display text with an input field in between', async () => {
    renderWithTheme(<KvikForm />)
    
    await waitFor(() => {
      const textBeforeInput = screen.getByText(/Kvik is a nice/i)
      expect(textBeforeInput).toBeInTheDocument()
    })

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()

    await waitFor(() => {
      const textAfterInput = screen.getByText(/. He loves to learn new things./i)
      expect(textAfterInput).toBeInTheDocument()
    })
  })

  it('calls checkAnswer with the correct answer and updates state to correct', async () => {
    renderWithTheme(<KvikForm />)

    await waitFor(() => expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument())

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'dog' } })

    fireEvent.click(screen.getByRole('button', { name: /tjek mit svar/i }))

    await waitFor(() => {
      expect(screen.getByText('Næste opgave')).toBeInTheDocument();
    })
  })

  it('calls checkAnswer with the wrong answer and updates the button name', async () => {
    jest.mock('../../services/apiClient', () => ({
      checkTheAnswer: jest.fn(() => Promise.resolve({ isCorrect: false }))
    }))

    renderWithTheme(<KvikForm />)

    await waitFor(() => expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument())

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'cat' } })
    fireEvent.click(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(screen.queryByText('Næste opgave')).not.toBeInTheDocument()
      expect(screen.getByText(/Tjek mit svar/i)).toBeInTheDocument()
    })

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'catt' } })
    fireEvent.click(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(screen.getByText(/prøv igen/i)).toBeInTheDocument()
    })
  })

  it('updates button text to the next task', async () => {
      jest.mock('../../services/apiClient', () => ({
      checkTheAnswer: jest.fn(() => Promise.resolve({ isCorrect: true }))
    }))

    renderWithTheme(<KvikForm />)

    await waitFor(() => expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument())

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'dog' } })
    fireEvent.click(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(screen.queryByText('Næste opgave')).toBeInTheDocument()
    })
  })
})
