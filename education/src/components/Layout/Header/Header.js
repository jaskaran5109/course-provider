import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import {
  RiDashboardFill,
  RiLogoutBoxLine,
  RiMenu5Fill,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';
const Header = ({isAuthenticated=false,user}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const isAuthenticated = false;
  // const user = {
  //   role: 'admin',
  // };
  const dispatch=useDispatch()
  const logoutHandler = () => {
    onClose()
    dispatch(logout())
  };
  return (
    <Fragment>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme={'yellow'}
        width="12"
        height="12"
        rounded={'full'}
        position={'fixed'}
        top="6"
        left="6"
      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay backdropFilter={'blur(3px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>COURSES</DrawerHeader>
          <DrawerBody>
            <VStack spacing={'4'} alignItems="flex-start">
              <LinkButton url="/" title="Home" onClose={onClose}/>
              <LinkButton url="/courses" title="Courses" onClose={onClose}/>
              <LinkButton url="/request" title="Request a course" onClose={onClose}/>
              <LinkButton url="/contact" title="Contact Us" onClose={onClose}/>
              <LinkButton url="/about" title="About" onClose={onClose}/>
              <HStack
                justifyContent={'space-evenly'}
                position="absolute"
                bottom={'2rem'}
                width="80%"
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link to="/profile" onClick={onClose}>
                          <Button colorScheme={'yellow'} variant={'ghost'}>
                            Profile
                          </Button>
                        </Link>
                        <Button variant={'ghost'} onClick={logoutHandler}>
                          <RiLogoutBoxLine style={{ margin: '4px' }} />
                          Logout
                        </Button>
                      </HStack>
                      {user && user.role === 'admin' && (
                        <Link to="/admin/dashboard" onClick={onClose}>
                          <Button colorScheme={'purple'} variant={'ghost'}>
                            <RiDashboardFill style={{ margin: '4px' }} />
                            Dasboard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={onClose}>
                      <Button variant={'yellow'}>Login</Button>
                    </Link>
                    <p>OR</p>
                    <Link to="/register" onClick={onClose}>
                      <Button variant={'yellow'}>Sign up</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
};

export default Header;

const LinkButton = ({ url = '/', title = 'Home',onClose }) => (
  <Link to={url} onClick={onClose}>
    <Button variant={'ghost'}>{title}</Button>
  </Link>
);
