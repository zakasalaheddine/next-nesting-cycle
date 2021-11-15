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
