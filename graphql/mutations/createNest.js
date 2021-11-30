import { gql, request } from 'graphql-request'
import { useMutation, useQueryClient } from 'react-query'
import { GRAPHQL_URL } from 'utils/constants'

export const createNewNest = async ({ male, female }) => {
  console.log({ male, female })
  const { nest } = await request(
    GRAPHQL_URL,
    gql`
      mutation createNewNest($male: ID!, $female: ID!) {
        createBirdsNest(input: { data: { male: $male, female: $female } }) {
          birdsNest {
            id
          }
        }
      }
    `,
    { male, female }
  )
  return nest
}

export const useCreateNewNest = () => {
  const queryClient = useQueryClient()
  return useMutation(async (data) => await createNewNest(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('graphql_nests')
    }
  })
}
