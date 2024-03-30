import axios from 'axios'

const baseURL = 'https://glkltp5rvo76hkmz4fraevhshu0yluco.lambda-url.eu-central-1.on.aws'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


const axiosInstance = axios.create({
  baseURL
})

// Service call to get a problem
const getProblem = async () => {
  try {
    const response = await axiosInstance.get('/problem')
    return response.data
  } catch (error) {
    console.error('Error fetching problem:', error)
    throw error
  }
}

// Service call to check an answer
const checkTheAnswer = async (input: string) => {
  try {
    const response = await axiosInstance.post('/check', {input})
    return response.data
  } catch (error) {
    console.error('Error checking answer:', error)
    throw error
  }
}

export { getProblem, checkTheAnswer }