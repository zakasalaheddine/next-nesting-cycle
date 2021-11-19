import axios from 'axios'

export const getAllNests = async () => {
  const { data } = await axios.get('/api/nests')
  return data
}

export const addNewNest = async (body) => {
  const { data } = await axios.post('/api/nests', {
    male: body.male,
    female: body.female
  })
  return data
}

export const getNestById = async (nestId) => {
  const { data } = await axios.get(`/api/nests/${nestId}`, {
    params: { nest: nestId }
  })
  console.log({ data })
  return data
}

export const postNewEgg = async (nestId) => {
  await axios.post('/api/eggs', { nest: nestId })
}
