import React, { useEffect, useState } from 'react';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { changePassword } from '../../redux/actions/profile';
import { useNavigate } from 'react-router-dom';
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(changePassword(oldPassword, newPassword));
  };
  const { loading, message, error } = useSelector(state => state.profile);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);
  return (
    <Container py="16" minH="90vh">
      <form onSubmit={handleSubmit}>
        <Heading
          my="16"
          textAlign={['center', 'left']}
          textTransform="uppercase"
        >
          Change Password
        </Heading>
        <VStack spacing="8">
          <Input
            required
            id="oldpassword"
            value={oldPassword}
            placeholder="Enter Old Password"
            onChange={e => setOldPassword(e.target.value)}
            type="password"
            focusBorderColor="yellow.500"
          />
          <Input
            required
            id="newpassword"
            value={newPassword}
            placeholder="Enter New Password"
            onChange={e => setNewPassword(e.target.value)}
            type="password"
            focusBorderColor="yellow.500"
          />
          <Button
            w="full"
            colorScheme={'yellow'}
            isLoading={loading}
            type="submit"
          >
            Change
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ChangePassword;
