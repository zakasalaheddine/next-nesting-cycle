import { gql, request } from 'graphql-request'
import moment from 'moment'
import { useMutation, useQueryClient } from 'react-query'
import { GRAPHQL_URL } from 'utils/constants'

export const createNewEgg = async ({ nestId, dateBirth }) => {
  const { nest } = await request(
    GRAPHQL_URL,
    gql`
      mutation addNewEgg($nestId: ID!, $dateBirth: Date) {
        createEgg(
          input: { data: { birds_nest: $nestId, dateBirth: $dateBirth } }
        ) {
          egg {
            id
            dateBirth
          }
        }
      }
    `,
    { nestId, dateBirth: moment().format('YYYY-MM-DD') }
  )
  return nest
}

export const useCreateNewEgg = (nestId) => {
  const queryClient = useQueryClient()
  return useMutation(async (data) => await createNewEgg(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['graphql_nest', nestId])
    }
  })
}
