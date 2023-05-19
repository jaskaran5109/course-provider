import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from '../../../redux/actions/admin';
import toast from 'react-hot-toast';
import { FaBars } from 'react-icons/fa';
const Users = ({ width }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { users, loading, error, message } = useSelector(state => state.admin);

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    dispatch(getAllUsers());
  }, [dispatch, error, message]);
  const updateHandler = id => {
    dispatch(updateUserRole(id));
  };
  const deleteUserHandler = id => {
    dispatch(deleteUser(id));
  };
  return (
    <>
      {width < 900 ? (
        <Grid minH="100vh">
          <Box p={['0', '16']} overflow="auto">
            <HStack my="16">
              <Button onClick={onOpen}>
                <FaBars />
              </Button>
              <Heading
                textTransform={'uppercase'}
                textAlign={['center', 'left']}
              >
                All Users
              </Heading>
            </HStack>
            <TableContainer w={['100vw', 'full']}>
              <Table variant="simple" size="lg">
                <TableCaption>All available Users in the Database</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Role</Th>
                    <Th>Subscription</Th>
                    <Th isNumeric>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users &&
                    users.map(item => (
                      <Row
                        item={item}
                        key={item._id}
                        updateHandler={updateHandler}
                        deleteUserHandler={deleteUserHandler}
                        loading={loading}
                      />
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      ) : (
        <Grid minH="100vh" templateColumns={['1fr', '5fr 1fr']}>
          {/* {loading ? (
        <Loader color="purple.500" />
      ) : ( */}
          <Box p={['0', '16']} overflow="auto">
            <Heading
              textTransform={'uppercase'}
              my="16"
              textAlign={['center', 'left']}
            >
              All Users
            </Heading>
            <TableContainer w={['100vw', 'full']}>
              <Table variant="simple" size="lg">
                <TableCaption>All available Users in the Database</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Role</Th>
                    <Th>Subscription</Th>
                    <Th isNumeric>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users &&
                    users.map(item => (
                      <Row
                        item={item}
                        key={item._id}
                        updateHandler={updateHandler}
                        deleteUserHandler={deleteUserHandler}
                        loading={loading}
                      />
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          {/* )} */}
          <Sidebar />
        </Grid>
      )}
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">SmartUpJr</DrawerHeader>
          <DrawerBody>
            <Sidebar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Users;

function Row({ item, updateHandler, deleteUserHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>
        {item.subscription && item.subscription.status === 'active'
          ? 'Active'
          : 'Not Active'}
      </Td>
      <Td isNumeric>
        <HStack justifyContent="flex-end">
          <Button
            variant="outline"
            color="puprle.500"
            onClick={() => updateHandler(item._id)}
            isLoading={loading}
          >
            Change Role
          </Button>
          <Button
            isLoading={loading}
            color="puprle.600"
            onClick={() => deleteUserHandler(item._id)}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
