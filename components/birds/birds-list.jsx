import { Button } from '@chakra-ui/button'
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import AddEditBirdModal from './add-edit-bird-modal'
import { useDisclosure } from '@chakra-ui/hooks'
import { useState } from 'react'

export default function BirdsList({ birdsTypes, birds }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [birdToEdit, setBirdToEdit] = useState()
  return (
    <>
      <AddEditBirdModal
        isOpen={isOpen}
        onClose={onClose}
        types={birdsTypes}
        birdToEdit={birdToEdit}
      />
      <Table variant="simple" size="sm">
        <TableCaption placement="top">
          <div>Manage My Birds</div>
          <Button
            colorScheme="orange"
            onClick={() => {
              setBirdToEdit(undefined)
              onOpen()
            }}
          >
            Add New Bird
          </Button>
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Ring Number</Th>
            <Th>Bird Type</Th>
            <Th>Bird Sexe</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {birds.map((bird) => (
            <Tr key={bird.id}>
              <Td>{bird.ringNumber}</Td>
              <Td>{bird.bird_type.type}</Td>
              <Td>{bird.sexe}</Td>
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
                  Edit
                </Button>
                <Button colorScheme="red" size="sm">
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}
