import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text
  } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../Store/auth/auth.actions';

export default function Logout({isOpen,onClose}) {
    //const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch();
    const userInfo = useSelector(store=>store.auth);
    const handleLogout = ()=>{
        dispatch(logoutUser());
        onClose();
    }
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose} size="xs">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Signout</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Hey <Text as="span" fontWeight={700} background="yellow" p={1}>{userInfo?.user?.username}</Text>, Do you really want to logout.
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='red' mr={3} onClick={handleLogout}>
                Logout
              </Button>
              <Button variant='ghost' onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }