import { gql, request } from 'graphql-request'
import { useMutation, useQueryClient } from 'react-query'
import { GRAPHQL_URL } from 'utils/constants'
import { connectNewBirdToFamily } from './connectBirdToFamily'

const firstFamilyByNestId = async (nestId) => {
  const { siblings } = await request(
    GRAPHQL_URL,
    gql`
      query getFamilyByNest($nestId: ID!) {
        siblings(where: { birds_nest: $nestId }) {
          id
        }
      }
    `,
    { nestId }
  )
  console.log({ siblings })
  if (siblings.length > 0) return siblings[0].id
  return null
}

export const firstOrCreateFamilyByNest = async (nestId) => {
  const familyId = await firstFamilyByNestId(nestId)
  console.log({ familyId })
  if (familyId) return familyId
  const {
    createSibling: {
      sibling: { id }
    }
  } = await request(
    GRAPHQL_URL,
    gql`
      mutation createNestFamily($nestId: ID!) {
        createSibling(input: { data: { birds_nest: $nestId } }) {
          sibling {
            id
          }
        }
      }
    `,
    { nestId }
  )
  return id
}
