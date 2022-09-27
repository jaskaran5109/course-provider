import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/actions/user';
const Subscribe = ({ user }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('');
  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );
  const { error: courseError } = useSelector(state => state.courses);
  const subscribeHandler = async () => {
    const { data } = await axios.get(`${server}/razorpaykey`);
    setKey(data.key);
    dispatch(buySubscription());
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionId) {
      const openPopup = () => {
        const options = {
          key,
          name: 'Course Provider',
          description: 'Get access to all premium content',
          subscription_id: subscriptionId,
          image: '',
          callback_url: `${server}/paymentVerification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: 'UttarPradesh , India',
          },
          theme: {
            color: '#FFC800',
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopup();
    }
  }, [
    dispatch,
    error,
    user.name,
    user.email,
    key,
    subscriptionId,
    courseError,
  ]);

  return (
    <Container h={'100vh'} p="16">
      <Heading m="8" textAlign="center">
        Welcome
      </Heading>
      <VStack
        boxShadow={'lg'}
        alignItems="stretch"
        borderRadius={'lg'}
        spacing="0"
      >
        <Box bg="yellow.400" p="4" css={{ borderRadius: '8px 8px 0 0' }}>
          <Text color="black">Pro Pack - ₹299.00 </Text>
        </Box>
        <Box p="4">
          <VStack textAlign={'center'} px="8" mt="4" spacing="8">
            <Text>Join Pro Pack and Get access to all content</Text>
            <Heading size="md">₹299 Only</Heading>
          </VStack>
          <Button
            my="8"
            width="full"
            colorScheme={'yellow'}
            onClick={subscribeHandler}
            isLoading={loading}
          >
            Buy Now
          </Button>
        </Box>
        <Box bg="blackAlpha.600" p="4" css={{ borderRadius: '0 0 8px 8px' }}>
          <Heading size="sm" color="white" textTransform={'uppercase'}>
            100% Refund at Cancellation
          </Heading>
          <Text fontSize="xm" color="white">
            Terms & Condition Apply
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
