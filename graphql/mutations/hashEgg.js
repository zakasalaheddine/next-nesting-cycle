import { gql, request } from 'graphql-request'
import moment from 'moment'
import { useMutation, useQueryClient } from 'react-query'
import { GRAPHQL_URL } from 'utils/constants'

export const hashEgg = async ({ id }) => {
  const { egg } = await request(
    GRAPHQL_URL,
    gql`
      mutation updateEgg($egg: ID!, $dateHash: Date) {
        updateEgg(
          input: { where: { id: $egg }, data: { dateHash: $dateHash } }
        ) {
          egg {
            id
            dateBirth
            dateHash
          }
        }
      }
    `,
    { egg: id, dateHash: moment().format('YYYY-MM-DD') }
  )
  return egg
}

export const useHashEgg = (nestId) => {
  const queryClient = useQueryClient()
  return useMutation(async (data) => await hashEgg(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['graphql_nest', nestId])
    }
  })
}
