import { gql, request } from 'graphql-request'
import { GRAPHQL_URL } from 'utils/constants'
import { connectNewBirdToFamily } from './connectBirdToFamily'

const getSiblingsDetailsIdFromBird = async (birdId) => {
  const { siblingDetails } = await request(
    GRAPHQL_URL,
    gql`
      query getSiblingDetailId($birdId: ID!) {
        siblingDetails(where: { bird: $birdId }) {
          id
        }
      }
    `,
    { birdId }
  )
  if (siblingDetails.length > 0) return siblingDetails[0].id
  return null
}

export const moveBirdToNewFamily = async (familyId, birdId) => {
  const siblingDetailsId = await getSiblingsDetailsIdFromBird(birdId)
  if (siblingDetailsId) {
    const { updateSiblingDetail } = await request(
      GRAPHQL_URL,
      gql`
        mutation updateBirdFamily($id: ID!, $familyId: ID!) {
          updateSiblingDetail(
            input: { data: { sibling: $familyId }, where: { id: $id } }
          ) {
            siblingDetail {
              id
            }
          }
        }
      `,
      { id: siblingDetailsId, familyId }
    )
  } else {
    await connectNewBirdToFamily(familyId, birdId)
  }
}
