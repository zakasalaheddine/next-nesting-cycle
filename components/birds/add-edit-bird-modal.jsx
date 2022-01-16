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
import { connectNewBirdToFamily } from 'graphql/mutations/connectBirdToFamily'
import { firstOrCreateFamilyByNest } from 'graphql/mutations/connectBirdToNestFamily'
import { useCreateNewBird } from 'graphql/mutations/createBird'
import { useCreateFamilyFromBird } from 'graphql/mutations/createFamilyFromBird'
import { useEggToBird } from 'graphql/mutations/eggToBird'
import { useUpdateBird } from 'graphql/mutations/updateBird'
import { arLang } from 'lang/ar'
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
    family: ''
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
      const createdBird = await createMutation({
        ringNumber: bird.ringNumber,
        sexe: bird.sexe,
        type: bird.type
      })
      if (selectedEgg) {
        eggToBirdMutation({ id: selectedEgg })
        const familyId = await firstOrCreateFamilyByNest(nestId)
        await connectNewBirdToFamily(familyId, createdBird.id)
      }
    }

    setBird({
      ringNumber: '',
      type: types[0] ? types[0].id : '',
      sexe: 'female',
      family: ''
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
        family: ''
      })
  }, [birdToEdit])
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{arLang['Add New Nest']}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>{arLang['Ring Number']}</FormLabel>
            <Input
              type="text"
              value={bird.ringNumber}
              onChange={(e) => handleChange('ringNumber', e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>{arLang['Bird Type']}</FormLabel>
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
            <FormLabel>{arLang['Bird Sexe']}</FormLabel>
            <Select
              value={bird.sexe}
              onChange={(e) => handleChange('sexe', e.target.value)}
            >
              <option value="male">{arLang['Male']}</option>
              <option value="female">{arLang['Female']}</option>
            </Select>
          </FormControl>
          {!selectedEgg && (
            <FormControl
              display="flex"
              alignItems="end"
              justifyContent="space-between"
              isDisabled={!birdToEdit}
            >
              <Box flex="1" mr="2">
                <FormLabel>{arLang['Families']}</FormLabel>
                <Select
                  value={bird.family}
                  onChange={(e) => handleChange('family', e.target.value)}
                >
                  <option value="">{arLang['Select Family']}</option>
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
                {arLang['Create New Family']}
              </Button>
            </FormControl>
          )}
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
            {arLang['Save']}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
