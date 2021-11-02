import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal'
import { Select } from '@chakra-ui/select'
import axios from 'axios'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { addNewBird } from 'utils/requests/birds'

export default function AddEditBirdModal({ isOpen, onClose, types }) {
  const queryClient = useQueryClient()
  const mutation = useMutation(addNewBird, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('birds')
    }
  })
  const handleAddNestSubmit = async () => {
    setLoading(true)
    mutation.mutate({
      ringNumber: bird.ringNumber,
      sexe: bird.sexe,
      type: bird.type
    })
    // const response = await axios.post('/api/add-bird', {
    //   name: '',
    //   ringNumber: bird.ringNumber,
    //   sexe: bird.sexe,
    //   type: bird.type
    // })
    // console.log(response)
    setLoading(false)
    setBird({
      ringNumber: '',
      type: types[0] ? types[0].id : '',
      sexe: 'female'
    })
    onClose()
  }
  const [bird, setBird] = useState({
    ringNumber: '',
    type: types[0] ? types[0].id : '',
    sexe: 'female'
  })
  const [loading, setLoading] = useState(false)
  const handleChange = (key, value) => {
    setBird({ ...bird, [key]: value })
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Nest</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Ring Number</FormLabel>
            <Input
              type="text"
              value={bird.ringNumber}
              onChange={(e) => handleChange('ringNumber', e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Select
              value={bird.type}
              onChange={(e) => handleChange('type', e.target.value)}
            >
              {types.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Sexe</FormLabel>
            <Select
              value={bird.sexe}
              onChange={(e) => handleChange('sexe', e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleAddNestSubmit}
            isLoading={loading}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
