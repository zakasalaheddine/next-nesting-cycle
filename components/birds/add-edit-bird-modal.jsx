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
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { addNewBird, editBird } from 'utils/requests/birds'

export default function AddEditBirdModal({
  isOpen,
  onClose,
  types,
  birdToEdit
}) {
  const queryClient = useQueryClient()
  const addBirdMutation = useMutation(addNewBird, {
    onSuccess: () => {
      queryClient.invalidateQueries('birds')
    }
  })
  const editBirdMutation = useMutation(editBird, {
    onSuccess: () => {
      queryClient.invalidateQueries('birds')
    }
  })

  const [bird, setBird] = useState({
    ringNumber: '',
    type: types[0] ? types[0].id : '',
    sexe: 'female'
  })

  const handleAddNestSubmit = async () => {
    if (birdToEdit) {
      editBirdMutation.mutate({
        id: bird.id,
        ringNumber: bird.ringNumber,
        sexe: bird.sexe,
        type: bird.type
      })
    } else {
      addBirdMutation.mutate({
        ringNumber: bird.ringNumber,
        sexe: bird.sexe,
        type: bird.type
      })
    }

    setBird({
      ringNumber: '',
      type: types[0] ? types[0].id : '',
      sexe: 'female'
    })
    onClose()
  }
  const handleChange = (key, value) => {
    setBird({ ...bird, [key]: value })
  }

  useEffect(() => {
    if (birdToEdit) setBird({ ...birdToEdit, type: birdToEdit.birdsTypeId })
    else
      setBird({
        ringNumber: '',
        type: types[0] ? types[0].id : '',
        sexe: 'female'
      })
  }, [birdToEdit])
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
            isLoading={addBirdMutation.isLoading || editBirdMutation.isLoading}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
