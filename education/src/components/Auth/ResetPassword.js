import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.profile);
  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password));
  };
  const navigate=useNavigate()
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
      navigate("/login")
    }
  }, [dispatch, error, message]);

  return (
    <Container py="16" height="90vh">
      <form onSubmit={submitHandler}>
        <Heading
          my="16"
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        >
          Reset Password
        </Heading>
        <VStack spacing="8">
          <Input
            type="password"
            required
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="New password"
            focusBorderColor="yellow.500"
          />
          <Button
            width="full"
            type="submit"
            colorScheme={'yellow'}
            isLoading={loading}
          >
            Update Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
