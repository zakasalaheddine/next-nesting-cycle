import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { GRAPHQL_URL } from 'utils/constants'

export const queryBirds = async () => {
  const { birds } = await request(
    GRAPHQL_URL,
    gql`
      {
        birds {
          id
          name
          ringNumber
          bird_type {
            id
            type
          }
          sexe
        }
      }
    `
  )
  return birds
}

export const useBirds = (initialData = []) => {
  return useQuery('graphql_birds', queryBirds, { initialData })
}
