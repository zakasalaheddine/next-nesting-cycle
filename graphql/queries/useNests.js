import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { GRAPHQL_URL } from 'utils/constants'

export const queryNests = async () => {
  const { birdsNests } = await request(
    GRAPHQL_URL,
    gql`
      {
        birdsNests {
          id
          male {
            id
            name
            ringNumber
            sexe
            bird_type {
              type
            }
          }
          female {
            id
            name
            ringNumber
            sexe
            bird_type {
              type
            }
          }
          eggs {
            id
            dateBirth
          }
        }
      }
    `
  )
  return birdsNests
}

export const useNests = (initialData = []) => {
  return useQuery('graphql_nests', queryNests, { initialData })
}
