import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import {Link} from 'react-router-dom'
import {  RiErrorWarningFill } from 'react-icons/ri';

const PaymentFail = () => {
  return (
    <Container h="100vh">
    <VStack justifyContent="center" height="full" spacing={"4"}>
      <RiErrorWarningFill size="5rem"/>
      <Heading my="8" textAlign={'center'} textTransform="uppercase">
        Payment Fail
      </Heading>
      <Link to="/subscribe">
        <Button variant={'ghost'}>Try again</Button>
      </Link>
    </VStack>
  </Container>
  )
}

export default PaymentFail