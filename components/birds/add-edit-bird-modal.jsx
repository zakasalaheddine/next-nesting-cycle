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
import { useCreateNewBird } from 'graphql/mutations/createBird'
import { useEggToBird } from 'graphql/mutations/eggToBird'
import { useUpdateBird } from 'graphql/mutations/updateBird'
import { useEffect, useState } from 'react'

export default function AddEditBirdModal({
  isOpen,
  onClose,
  types,
  birdToEdit,
  selectedEgg,
  nestId,
  families
}) {
  const { mutate: createMutation, isLoading: isCreateLoading } =
    useCreateNewBird()
  const { mutate: updateBirdMutation, isLoading: isUpdateLoading } =
    useUpdateBird()

  const { mutate: eggToBirdMutation, isLoading: isEggToBirdLoading } =
    useEggToBird(nestId)

  const [bird, setBird] = useState({
    ringNumber: '',
    type: types[0] ? types[0].id : '',
    sexe: 'female',
    family: families[0] ? families[0].id : ''
  })

  const handleAddNestSubmit = async () => {
    if (birdToEdit) {
      updateBirdMutation({
        id: bird.id,
        ringNumber: bird.ringNumber,
        sexe: bird.sexe,
        type: bird.type,
        family: bird.family
      })
    } else {
      createMutation({
        ringNumber: bird.ringNumber,
        sexe: bird.sexe,
        type: bird.type,
        family: bird.family
      })
      if (selectedEgg) {
        eggToBirdMutation({ id: selectedEgg })
      }
    }

    setBird({
      ringNumber: '',
      type: types[0] ? types[0].id : '',
      sexe: 'female',
      family: families[0] ? families[0].id : ''
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
        sexe: 'female',
        family: families[0] ? families[0].id : ''
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
              {types.map(({ id, type }) => (
                <option value={id} key={id}>
                  {type}
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
          <FormControl>
            <FormLabel>Families</FormLabel>
            <Select
              value={bird.family}
              onChange={(e) => handleChange('family', e.target.value)}
            >
              {families.map(({ id }) => (
                <option value={id} key={id}>
                  Family {id}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleAddNestSubmit}
            isLoading={isCreateLoading || isUpdateLoading || isEggToBirdLoading}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
