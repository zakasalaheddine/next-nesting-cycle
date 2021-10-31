import { Button } from '@chakra-ui/button'
import { Input, Select } from '@chakra-ui/react'
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import AddEditBirdModal from './add-edit-bird-modal'
import {useDisclosure} from '@chakra-ui/hooks'

export default function BirdsList() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <AddEditBirdModal isOpen={isOpen} onClose={onClose} />
      <Table variant="simple" size="sm">
        <TableCaption placement="bottom">
          <div>Manage My Birds</div>
          <Button colorScheme="orange" onClick={onOpen}>Add New Bird</Button>
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
          <Tr>
            <Td>1234</Td>
            <Td>Canary</Td>
            <Td>Female</Td>
            <Td
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button colorScheme="teal" size="sm">
                Edit
              </Button>
              <Button colorScheme="red" size="sm">
                Delete
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  )
}
