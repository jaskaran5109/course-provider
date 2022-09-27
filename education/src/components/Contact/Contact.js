import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { contactUs } from '../../redux/actions/other';
const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(contactUs(name, email, message));
  };
  const { loading, message: msg, error } = useSelector(state => state.other);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (msg) {
      toast.success(msg);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, msg]);

  return (
    <Container h="90vh">
      <VStack h="full" justifyContent="center" spacing="8">
        <Heading>Contact Us</Heading>
        <form style={{ width: '100%' }} onSubmit={submitHandler}>
          <Box my={'4'}>
            <FormLabel htmlFor="name" children={'Enter Your Name'} />
            <Input
              type="text"
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="email" children={'Email Address'} />
            <Input
              type="email"
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="message" children={'Message'} />
            <Input
              type="text"
              required
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Enter your Message"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Button isLoading={loading} my={'4'} colorScheme={'yellow'} type="submit">
            SEND
          </Button>
          <Box my={'4'}>
            Request For a Course?{' '}
            <Link to="/request">
              <Button colorScheme={'yellow'} variant="link">
                Click
              </Button>
            </Link>{' '}
            here
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Contact;
