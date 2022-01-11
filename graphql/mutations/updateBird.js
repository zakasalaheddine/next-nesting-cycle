import { gql, request } from 'graphql-request'
import { useMutation, useQueryClient } from 'react-query'
import { GRAPHQL_URL } from 'utils/constants'

export const updateBird = async ({ id, ringNumber, sexe, type, family }) => {
  const {
    updateBird: { bird }
  } = await request(
    GRAPHQL_URL,
    gql`
      mutation updateBird(
        $ringNumber: String
        $sexe: ENUM_BIRD_SEXE
        $bird_type: ID
        $bird: ID!
      ) {
        updateBird(
          input: {
            where: { id: $bird }
            data: {
              name: ""
              ringNumber: $ringNumber
              sexe: $sexe
              bird_type: $bird_type
            }
          }
        ) {
          bird {
            id
          }
        }
      }
    `,
    { ringNumber, sexe, type, bird: id }
  )
  return bird
}

export const useUpdateBird = () => {
  const queryClient = useQueryClient()
  return useMutation(async (data) => await updateBird(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('graphql_birds')
    }
  })
}
