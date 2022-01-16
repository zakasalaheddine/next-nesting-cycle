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
import { useCreateNewNest } from 'graphql/mutations/createNest'
import { arLang } from 'lang/ar'
import { useEffect } from 'react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { addNewNest } from 'utils/requests/nests'

const findMaleFamilyWithId = (id, males = []) =>
  males.find((male) => male.id === id).families

export default function AddNestModal({ isOpen, onClose, males, females }) {
  console.log({ males, females })
  const [male, setMale] = useState('')
  const [female, setFemale] = useState('')
  const [allMales, setAllMales] = useState(males)
  const [allFemales, setAllFemales] = useState(females)

  const { mutateAsync } = useCreateNewNest()

  useEffect(() => {
    setAllMales(males)
    setAllFemales(females)
  }, [males, females])

  const handleChangeMaleSelect = (e) => {
    setMale(e.target.value)
    if (e.target.value === '') return setAllFemales(females)
    const selectedFamily = findMaleFamilyWithId(e.target.value, males)
    if (!selectedFamily) return setAllFemales(females)

    const notSiblingsFemales = females.filter(
      (element) => element.families?.family?.id !== selectedFamily.family.id
    )
    setAllFemales(notSiblingsFemales)
  }

  const handleAddNestSubmit = async () => {
    await mutateAsync({ male, female })
    onClose()
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{arLang['Add New Nest']}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>{arLang['Male']}</FormLabel>
            <Select value={male} onChange={handleChangeMaleSelect}>
              <option value="">{arLang['Select a male']}</option>
              {allMales.map((male) => (
                <option key={male.id} value={male.id}>
                  {male.ringNumber}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>{arLang['Female']}</FormLabel>
            <Select
              value={female}
              onChange={(e) => {
                setFemale(e.target.value)
              }}
            >
              <option value="">{arLang['Select a female']}</option>
              {allFemales.map((female) => (
                <option key={female.id} value={female.id}>
                  {female.ringNumber}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddNestSubmit}>
            {arLang['Save']}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
