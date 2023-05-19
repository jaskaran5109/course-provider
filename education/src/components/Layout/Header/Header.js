import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { BsCaretDownFill, BsPersonFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { logout } from '../../../redux/actions/user';
import Icon from '../../../assets/Images/favicon.ico';
const Header = ({ isAuthenticated = false, user, width }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const logoutHandler = () => {
    onClose();
    dispatch(logout());
  };
  return (
    <div>
      {width < 1000 && <ColorModeSwitcher />}
      {width >= 1000 ? (
        <HStack
          style={{
            padding: '20px',
            boxShadow: '1px 3px 5px 1px #8185EA',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          <Box display={'flex'} alignItems="center">
            <Image src={Icon} mr="2" width={'40px'} height="40px" />
            <Text fontSize={25} fontWeight={'bold'} fontFamily="Marmelad">
              SmartUpJr
            </Text>
          </Box>
          <HStack>
            <LinkButton url="/" title="Home" />
            <LinkButton url="/courses" title="Courses" />
            <LinkButton url="/notes" title="Notes" />
            <LinkButton url="/request" title="Request a course" />
            <LinkButton url="/contact" title="Contact Us" />
            <LinkButton url="/about" title="About" />
            {isAuthenticated ? (
              <VStack>
                <Menu>
                  <MenuButton
                    px={4}
                    py={2}
                    transition="all 0.2s"
                    borderRadius="md"
                    borderWidth="1px"
                    _hover={{ bg: 'gray.100', color: 'black' }}
                  >
                    <HStack
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Avatar
                        name={user.name && user.name}
                        src={user.avatar.url && user.avatar.url}
                        size="xs"
                      />
                      <Text>
                        {user.name &&
                          user.name[0].toUpperCase() + user.name.slice(1)}
                      </Text>
                      <BsCaretDownFill style={{ margin: '4px' }} />
                    </HStack>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      {' '}
                      <Link to="/profile" onClick={onClose}>
                        <Button colorScheme={'yellow'} variant={'ghost'}>
                          <BsPersonFill style={{ margin: '4px' }} />
                          Profile
                        </Button>
                      </Link>
                    </MenuItem>
                    {user && user.role === 'admin' && (
                      <MenuItem>
                        <Link to="/admin/dashboard" onClick={onClose}>
                          <Button colorScheme={'purple'} variant={'ghost'}>
                            <RiDashboardFill style={{ margin: '4px' }} />
                            Dashboard
                          </Button>
                        </Link>
                      </MenuItem>
                    )}
                    <MenuDivider />
                    <MenuItem>
                      <Button variant={'ghost'} onClick={logoutHandler}>
                        <RiLogoutBoxLine style={{ margin: '4px' }} />
                        Logout
                      </Button>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </VStack>
            ) : (
              <HStack>
                <Link to="/login" onClick={onClose}>
                  <Button variant={'solid'} colorScheme={'yellow'}>
                    Login
                  </Button>
                </Link>
                <p>OR</p>
                <Link to="/register" onClick={onClose}>
                  <Button variant={'solid'} colorScheme={'yellow'}>
                    Sign up
                  </Button>
                </Link>
              </HStack>
            )}
          </HStack>
          <HStack>
            <ColorModeSwitcher />
          </HStack>
        </HStack>
      ) : (
        <>
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
              <DrawerHeader borderBottomWidth={'1px'} display={'flex'} alignItems="center">
                <Image src={Icon} mr="2" width={'40px'} height="40px" />
                <Text fontSize={25} fontWeight={'bold'} fontFamily="Marmelad">
                  SmartUpJr
                </Text>
              </DrawerHeader>

              <DrawerBody>
                <VStack spacing={'4'} alignItems="flex-start">
                  <LinkButton url="/" title="Home" onClose={onClose} />
                  <LinkButton
                    url="/courses"
                    title="Courses"
                    onClose={onClose}
                  />
                  <LinkButton url="/notes" title="Notes" onClose={onClose} />
                  <LinkButton
                    url="/request"
                    title="Request a course"
                    onClose={onClose}
                  />
                  <LinkButton
                    url="/contact"
                    title="Contact Us"
                    onClose={onClose}
                  />
                  <LinkButton url="/about" title="About" onClose={onClose} />
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
        </>
      )}
    </div>
  );
};

export default Header;

const LinkButton = ({ url = '/', title = 'Home', onClose }) => (
  <Link to={url} onClick={onClose}>
    <Button variant={'ghost'}>{title}</Button>
  </Link>
);
