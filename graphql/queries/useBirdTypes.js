import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { GRAPHQL_URL } from 'utils/constants'

export const queryBirdTypes = async () => {
  const { birdTypes } = await request(
    GRAPHQL_URL,
    gql`
      {
        birdTypes {
          id
          type
        }
      }
    `
  )
  return birdTypes
}

export const useNest = () => {
  return useQuery('graphql_birdTypes', queryBirdTypes)
}
