import {
  Box,
  Button,
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
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers, updateUserRole } from '../../../redux/actions/admin';
import toast from 'react-hot-toast'
const Users = () => {
  const { users, loading,error,message } = useSelector(state => state.admin);
  
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
  }, [dispatch,error, message]);
  const updateHandler = id => {
    dispatch(updateUserRole(id))
  };
  const deleteUserHandler = id => {
    dispatch(deleteUser(id))
  };
  return (
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
                {users && users.map(item => (
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
  );
};

export default Users;

function Row({ item, updateHandler, deleteUserHandler,loading }) {
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
            onClick={()=>updateHandler(item._id)}
            isLoading={loading}
          >
            Change Role
          </Button>
          <Button isLoading={loading} color="puprle.600" onClick={()=>deleteUserHandler(item._id)}>
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
