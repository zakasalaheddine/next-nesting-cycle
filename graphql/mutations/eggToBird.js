import { gql, request } from 'graphql-request'
import { useMutation, useQueryClient } from 'react-query'
import { GRAPHQL_URL } from 'utils/constants'

export const eggToBird = async ({ id }) => {
  console.log({ id })
  const { egg } = await request(
    GRAPHQL_URL,
    gql`
      mutation updateEgg($egg: ID!) {
        updateEgg(input: { where: { id: $egg }, data: { birdCreated: true } }) {
          egg {
            id
            dateBirth
            dateHash
          }
        }
      }
    `,
    { egg: id }
  )
  console.log({ egg })
  return egg
}

export const useEggToBird = (nestId) => {
  console.log({ nestIdfromHook: nestId })
  const queryClient = useQueryClient()
  return useMutation(async (data) => await eggToBird(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['graphql_nest', nestId])
    }
  })
}
