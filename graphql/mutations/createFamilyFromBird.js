import { gql, request } from 'graphql-request'
import { useMutation, useQueryClient } from 'react-query'
import { GRAPHQL_URL } from 'utils/constants'

export const createFamilyFromBird = async () => {
  const { createSibling } = await request(
    GRAPHQL_URL,
    gql`
      mutation createNewFamily {
        createSibling {
          sibling {
            id
          }
        }
      }
    `
  )
  const { sibling } = createSibling
  return sibling.id
}

export const useCreateFamilyFromBird = () => {
  const queryClient = useQueryClient()
  return useMutation(async (data) => await createFamilyFromBird(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('graphql_families')
    }
  })
}