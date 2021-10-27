import { IconButton } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import styled from '@emotion/styled'
import { IoIosAdd } from 'react-icons/io'

export default function AddNestFloatingButton({ onClick }) {
  return (
    <AddNestButton
      onClick={onClick}
      aria-label="Add New Nest"
      colorScheme="teal"
      icon={<Icon as={IoIosAdd} h={50} w={50} />}
    />
  )
}

const AddNestButton = styled(IconButton)`
  height: auto;
  padding: 10px;
  margin: 10px 0px;
`
