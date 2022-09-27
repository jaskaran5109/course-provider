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
import { Link } from 'react-router-dom';
import { courseRequest } from '../../redux/actions/other';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Request = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(courseRequest(name, email, course));
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
        <Heading>Request New Course</Heading>
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
            <FormLabel htmlFor="course" children={'Course'} />
            <Input
              type="text"
              required
              id="course"
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="Explain the course.."
              focusBorderColor="yellow.500"
            />
          </Box>
          <Button
            isLoading={loading}
            my={'4'}
            colorScheme={'yellow'}
            type="submit"
          >
            SEND
          </Button>
          <Box my={'4'}>
            See Available Courses!{' '}
            <Link to="/courses">
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

export default Request;
