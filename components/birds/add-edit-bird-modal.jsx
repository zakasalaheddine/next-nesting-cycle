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
import { Box } from '@chakra-ui/react'
import { Select } from '@chakra-ui/select'
import { useConnectFamily } from 'graphql/mutations/addFamily'
import { useCreateNewBird } from 'graphql/mutations/createBird'
import { useCreateFamilyFromBird } from 'graphql/mutations/createFamilyFromBird'
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
  const { mutateAsync: createMutation, isLoading: isCreateLoading } =
    useCreateNewBird()
  const { mutateAsync: updateBirdMutation, isLoading: isUpdateLoading } =
    useUpdateBird()

  const { mutateAsync: eggToBirdMutation, isLoading: isEggToBirdLoading } =
    useEggToBird(nestId)

  const {
    mutateAsync: createFamilyFromBird,
    isLoading: isCreateFamilyFromBird
  } = useCreateFamilyFromBird()

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

  const handleCreateNewFamily = async () => {
    const familyId = await createFamilyFromBird()
    setBird({ ...bird, family: familyId })
  }

  useEffect(() => {
    if (birdToEdit)
      setBird({
        ...birdToEdit,
        type: birdToEdit.birdsTypeId,
        family: birdToEdit.families?.family?.id || ''
      })
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
          <FormControl
            display="flex"
            alignItems="end"
            justifyContent="space-between"
          >
            <Box flex="1" mr="2">
              <FormLabel>Families</FormLabel>
              <Select
                value={bird.family}
                onChange={(e) => handleChange('family', e.target.value)}
              >
                <option value="">Select Family</option>
                {families.map(({ id }) => (
                  <option value={id} key={id}>
                    Family {id}
                  </option>
                ))}
              </Select>
            </Box>
            <Button
              colorScheme="teal"
              disabled={!birdToEdit}
              isLoading={isCreateFamilyFromBird}
              onClick={handleCreateNewFamily}
            >
              Create New Family
            </Button>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleAddNestSubmit}
            isLoading={
              isCreateLoading ||
              isUpdateLoading ||
              isEggToBirdLoading ||
              isCreateFamilyFromBird
            }
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
