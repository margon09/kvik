import axios from 'axios'

axios.defaults.baseURL = 'https://glkltp5rvo76hkmz4fraevhshu0yluco.lambda-url.eu-central-1.on.aws'
axios.defaults.headers.post['Content-Type'] ='text/plain'

const getProblem = async (setIsLoading: (loading: boolean) => void) => {
  try {
    setIsLoading(true)
    const response = await axios.get('/problem')
    setIsLoading(false)
    return response.data
  } catch (error) {
    setIsLoading(false)
    console.error('Error fetching problem:', error)
    throw error
  }
}

const checkTheAnswer = async (input: string, setIsLoading: (loading: boolean) => void) => {
  try {
    setIsLoading(true)
    const response = await axios.post('/check', {input0: input})
    setIsLoading(false)
    return response.data
  } catch (error) {
    setIsLoading(false)
    console.error('Error checking answer:', error)
    throw error
  }
}

export { getProblem, checkTheAnswer }