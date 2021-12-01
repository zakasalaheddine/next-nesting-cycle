import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { GRAPHQL_URL } from 'utils/constants'

export const queryNest = async (nestId) => {
  console.log({ nestId })
  const { birdsNest } = await request(
    GRAPHQL_URL,
    gql`
      query GetSingleNest($nestId: ID!) {
        birdsNest(id: $nestId) {
          id
          male {
            id
            ringNumber
            bird_type {
              type
            }
          }
          female {
            id
            ringNumber
            bird_type {
              type
            }
          }
          eggs(where: { birdCreated: false }) {
            id
            dateBirth
            dateHash
          }
        }
      }
    `,
    { nestId: nestId }
  )
  return birdsNest
}

export const useNest = (nestId) => {
  return useQuery(
    ['graphql_nest', nestId],
    async () => queryNest(parseInt(nestId)),
    { enabled: !!nestId }
  )
}
