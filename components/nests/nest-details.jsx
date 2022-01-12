import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Box, Text } from '@chakra-ui/layout'
import styled from '@emotion/styled'
import AddEditBirdModal from 'components/birds/add-edit-bird-modal'
import Layout from 'components/layout'
import { useCreateNewEgg } from 'graphql/mutations/createEgg'
import { useHashEgg } from 'graphql/mutations/hashEgg'
import { useState } from 'react'
import { BirdIcon } from 'utils/icons/bird-icon'
import { CrackedEgg } from 'utils/icons/cracked-icon'

export default function NestDetails({ nest, types, families }) {
  const { male, female, eggs, id } = nest
  const [selectedEgg, setSelectedEgg] = useState(null)
  const { mutate, isLoading } = useCreateNewEgg(id)
  const { mutate: hashEggMutation, isLoading: isEggHashLoading } =
    useHashEgg(id)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const addNewEgg = () => {
    mutate({ nestId: id })
  }

  const hashEgg = (eggId) => {
    hashEggMutation({ id: eggId })
  }

  const openCreateNewBird = (eggId) => {
    setSelectedEgg(eggId)
    onOpen()
  }

  return (
    <Layout>
      <AddEditBirdModal
        isOpen={isOpen}
        onClose={onClose}
        types={types}
        selectedEgg={selectedEgg}
        nestId={id}
        families={families}
      />
      <DetailsContainer>
        <ParentsContainer>
          <Box>Male {`${male.bird_type.type} ${male.ringNumber}`}</Box>
          <Box>Female {`${female.bird_type.type} ${female.ringNumber}`}</Box>
        </ParentsContainer>
        <EggsContainer>
          {eggs.map((egg, idx) => (
            <Box key={egg.id}>
              <Text>
                Egg {idx + 1} | {egg.dateBirth}
              </Text>
              <IconButton
                aria-label="Cracked Egg"
                icon={
                  egg.dateHash ? (
                    <BirdIcon fill="none" />
                  ) : (
                    <CrackedEgg fill="none" />
                  )
                }
                onClick={
                  egg.dateHash
                    ? () => openCreateNewBird(egg.id)
                    : () => hashEgg(egg.id)
                }
                isLoading={isEggHashLoading}
              />
            </Box>
          ))}
        </EggsContainer>

        <Button
          colorScheme="teal"
          mt="10"
          w="full"
          onClick={addNewEgg}
          isLoading={isLoading}
        >
          Add New Egg
        </Button>
      </DetailsContainer>
    </Layout>
  )
}

const DetailsContainer = styled(Box)`
  max-width: 500px;
  margin: 10px auto;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const ParentsContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 22px;
  font-weight: 700;
  div {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex: 1;
  }
  div:nth-of-type(1) {
    border-right: 1px solid rgba(0, 0, 0, 0.25);
  }
`

const EggsContainer = styled(Box)`
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
`
