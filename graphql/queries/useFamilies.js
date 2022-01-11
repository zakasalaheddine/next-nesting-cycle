import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { GRAPHQL_URL } from 'utils/constants'

export const queryFamilies = async () => {
  const { siblings } = await request(
    GRAPHQL_URL,
    gql`
      {
        siblings {
          id
        }
      }
    `
  )
  return siblings
}

export const useFamilies = (initialData = []) => {
  return useQuery('graphql_families', queryFamilies, { initialData })
}
