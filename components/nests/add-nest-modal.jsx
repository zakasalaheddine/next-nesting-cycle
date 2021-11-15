import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
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
import { useState } from 'react'
import {  useMutation, useQueryClient } from 'react-query'
import { addNewNest } from 'utils/requests/nests'

export default function AddNestModal({ isOpen, onClose, males, females }) {
  const [male, setMale] = useState('')
  const [female, setFemale] = useState('')

  const queryClient = useQueryClient()
  const addNestMutation = useMutation(addNewNest, {
    onSuccess: () => {
      queryClient.invalidateQueries('nests')
    }
  })

  const handleAddNestSubmit = async () => {
    addNestMutation.mutate({
      male,
      female
    })
    onClose()
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Nest</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Male</FormLabel>
            <Select
              value={male}
              onChange={(e) => {
                setMale(e.target.value)
              }}
            >
              <option value="">Select a male</option>
              {males.map((male) => (
                <option key={male.id} value={male.id}>
                  {male.ringNumber}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Female</FormLabel>
            <Select
              value={female}
              onChange={(e) => {
                setFemale(e.target.value)
              }}
            >
              <option value="">Select a female</option>
              {females.map((female) => (
                <option key={female.id} value={female.id}>
                  {female.ringNumber}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddNestSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
