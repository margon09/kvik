import axios from 'axios'

const baseURL = 'https://glkltp5rvo76hkmz4fraevhshu0yluco.lambda-url.eu-central-1.on.aws'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


const axiosInstance = axios.create({
  baseURL
})

// Service call to get a problem
const getProblem = async (setIsLoading: (loading: boolean) => void) => {
  try {
    setIsLoading(true)
    const response = await axiosInstance.get('/problem')
    setIsLoading(false)
    return response.data
  } catch (error) {
    setIsLoading(false)
    console.error('Error fetching problem:', error)
    throw error
  }
}

// Service call to check an answer
const checkTheAnswer = async (input: string, setIsLoading: (loading: boolean) => void) => {
  try {
    setIsLoading(true)
    const response = await axiosInstance.post('/check', {input})
    setIsLoading(false)
    return response.data
  } catch (error) {
    setIsLoading(false)
    console.error('Error checking answer:', error)
    throw error
  }
}

export { getProblem, checkTheAnswer }