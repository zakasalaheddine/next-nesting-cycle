import axios from 'axios'

export const getAllBirds = async () => {
  const { data } = await axios.get('/api/birds')
  return data
}

export const addNewBird = async (body) => {
  const { data } = await axios.post('/api/add-bird', {
    name: '',
    ringNumber: body.ringNumber,
    sexe: body.sexe,
    type: body.type
  })
  return data
}
export const editBird = async (body) => {
  const { data } = await axios.put('/api/add-bird', {
    id: body.id,
    name: '',
    ringNumber: body.ringNumber,
    sexe: body.sexe,
    type: body.type
  })
  return data
}
