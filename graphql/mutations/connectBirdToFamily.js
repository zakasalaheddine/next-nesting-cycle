import { gql, request } from 'graphql-request'
import { useMutation, useQueryClient } from 'react-query'
import { GRAPHQL_URL } from 'utils/constants'

export const connectNewBirdToFamily = async (familyId, birdId) => {
  const { createSiblingDetail } = await request(
    GRAPHQL_URL,
    gql`
      mutation connectFamily($birdId: ID!, $siblingId: ID!) {
        createSiblingDetail(
          input: { data: { sibling: $siblingId, bird: $birdId } }
        ) {
          siblingDetail {
            id
          }
        }
      }
    `,
    { birdId, siblingId: familyId }
  )
  const { siblingDetail } = createSiblingDetail
  return siblingDetail.id
}

export const useConnectNewBirdToFamily = () => {
  const queryClient = useQueryClient()
  return useMutation(async (data) => await connectNewBirdToFamily(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('graphql_birds')
    }
  })
}
