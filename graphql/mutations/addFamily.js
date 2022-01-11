import { gql, request } from 'graphql-request'
import { useMutation, useQueryClient } from 'react-query'
import { GRAPHQL_URL } from 'utils/constants'

const getSiblingByNestId = async (nestId) => {
  const { siblings } = await request(
    GRAPHQL_URL,
    gql`
      query getSiblingByNestId($nestId: ID) {
        siblings(where: { birds_nest: $nestId }) {
          id
        }
      }
    `,
    { nestId }
  )
  if (siblings && siblings.length > 0) return siblings[0].id
  return false
}

const getSiblingByBirdId = async (birdId) => {
  const { siblingDetails } = await request(
    GRAPHQL_URL,
    gql`
      query getSiblingByBird($birdId: ID) {
        siblingDetails(where: { bird: $birdId }) {
          sibling {
            id
          }
        }
      }
    `,
    { birdId }
  )
  if (siblingDetails && siblingDetails.length > 0)
    return siblingDetails[0].sibling.id
  return false
}

const createSibling = async (nestId) => {
  const { createSibling } = await request(
    GRAPHQL_URL,
    gql`
      mutation createNewFamily($nestId: ID) {
        createSibling(input: { data: { birds_nest: $nestId } }) {
          sibling {
            id
          }
        }
      }
    `,
    { birdId }
  )
  const { sibling } = createSibling
  return sibling.id
}

const checkSibling = async ({ nestId, birdId, siblingsId }) => {
  if (siblingsId) return siblingsId
  if (nestId) {
    return await getSiblingByNestId(nestId)
  }
  if (birdId) {
    return await getSiblingByBirdId(birdId)
  }
  return await createSibling(nestId)
}

export const connectFamily = async ({
  nestId,
  birdId,
  siblingsId,
  newBirdId
}) => {
  const siblingId = await checkSibling({ nestId, birdId, siblingsId })

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
    { birdId: newBirdId, siblingId }
  )
  return createSiblingDetail
}


export const changeFamily = async ({birdId, siblingId}) => {
  const { createSiblingDetail } = await request(
    GRAPHQL_URL,
    gql`
      mutation changeFamily($birdId: ID!, $siblingId: ID!, $detailId: ID!) {
  updateSiblingDetail(
    input: {
      data: { sibling: $siblingId, bird: $birdId }
      where: { id: $detailId }
    }
  ) {
    siblingDetail {
      id
    }
  }
}
    `,
    { birdId: newBirdId, siblingId }
  )
}

export const useConnectFamily = () => {
  const queryClient = useQueryClient()
  return useMutation(async (data) => await connectFamily(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('graphql_birds')
    }
  })
}
