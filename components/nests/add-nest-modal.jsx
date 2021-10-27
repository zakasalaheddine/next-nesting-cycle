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

export default function AddNestModal({ isOpen, onClose }) {
  const handleAddNestSubmit = () => {
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
            <Select>
              <option value="1203">Canary 1203</option>
              <option value="1204">Canary 1204</option>
              <option value="1205">Canary 1205</option>
              <option value="1206">Canary 1206</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Female</FormLabel>
            <Select>
              <option value="1203">Canary 1203</option>
              <option value="1204">Canary 1204</option>
              <option value="1205">Canary 1205</option>
              <option value="1206">Canary 1206</option>
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
