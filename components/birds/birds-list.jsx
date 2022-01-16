import { Button } from '@chakra-ui/button'
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import AddEditBirdModal from './add-edit-bird-modal'
import { useDisclosure } from '@chakra-ui/hooks'
import { useState } from 'react'
import { useFamilies } from 'graphql/queries/useFamilies'
import { arLang } from 'lang/ar'

export default function BirdsList({ birdsTypes, birds, families }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [birdToEdit, setBirdToEdit] = useState()
  const { data: graphQlFamiles } = useFamilies(families)

  return (
    <>
      <AddEditBirdModal
        isOpen={isOpen}
        onClose={onClose}
        types={birdsTypes}
        birdToEdit={birdToEdit}
        families={graphQlFamiles}
      />
      <Table variant="simple" size="sm">
        <TableCaption placement="top">
          <div>{arLang['Manage My Birds']}</div>
          <Button
            colorScheme="orange"
            onClick={() => {
              setBirdToEdit(undefined)
              onOpen()
            }}
          >
            {arLang['Add New Bird']}
          </Button>
        </TableCaption>
        <Thead>
          <Tr>
            <Th>{arLang['Ring Number']}</Th>
            <Th>{arLang['Bird Type']}</Th>
            <Th>{arLang['Bird Sexe']}</Th>
            <Th>{arLang['Actions']}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {birds.map((bird) => (
            <Tr key={bird.id}>
              <Td>{bird.ringNumber}</Td>
              <Td>{bird.bird_type.type}</Td>
              <Td>{arLang[bird.sexe]}</Td>
              <Td
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() => {
                    setBirdToEdit(bird)
                    onOpen()
                  }}
                >
                  {arLang['Edit']}
                </Button>
                <Button colorScheme="red" size="sm">
                  {arLang['Delete']}
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}
