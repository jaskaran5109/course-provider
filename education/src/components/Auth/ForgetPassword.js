import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/profile';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.profile);
  const submitHandler = e => {
    e.preventDefault();
    dispatch(forgetPassword(email));
  };
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
    <Container py="16" height="90vh">
      <form onSubmit={submitHandler}>
        <Heading
          my="16"
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        >
          Forget Password
        </Heading>
        <VStack spacing="8">
          <Input
            type="email"
            required
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            focusBorderColor="yellow.500"
          />
          <Button
            width="full"
            colorScheme={'yellow'}
            isLoading={loading}
            type="submit"
          >
            Submit
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
