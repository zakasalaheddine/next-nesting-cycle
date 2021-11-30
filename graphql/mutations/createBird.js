import { gql, request } from 'graphql-request'
import { useMutation, useQueryClient } from 'react-query'
import { GRAPHQL_URL } from 'utils/constants'

export const createNewBird = async ({ ringNumber, sexe, type }) => {
  const { nest } = await request(
    GRAPHQL_URL,
    gql`
      mutation createNewbird(
        $ringNumber: String
        $sexe: ENUM_BIRD_SEXE
        $type: ID
      ) {
        createBird(
          input: {
            data: {
              name: ""
              ringNumber: $ringNumber
              sexe: $sexe
              bird_type: $type
            }
          }
        ) {
          bird {
            id
          }
        }
      }
    `,
    { ringNumber, sexe, type }
  )
  return nest
}

export const useCreateNewBird = () => {
  const queryClient = useQueryClient()
  return useMutation(async (data) => await createNewBird(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('graphql_birds')
    }
  })
}
