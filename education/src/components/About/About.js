import React from 'react';
import {
  Avatar,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
const About = () => {
  return (
    <Container
      maxWidth={'container.lg'}
      padding="16"
      marginTop="50px"
      marginBottom={'100px'}
      boxShadow="1px 3px 5px 1px #8185EA"
    >
      <Heading textAlign={['center', 'left']}>About Us</Heading>
      <Founder />
      <Stack direction={['column', 'row']} alignItems="center">
        <Text fontFamily="cursive" m="0" textAlign={'center'}>
          We want to ensure that our students have the opportunity to access our
          courses regardless of their financial situation. Our team of dedicated
          support staff is always available to help you with any questions or
          issues you may have. We want to ensure that your learning experience
          is as smooth and enjoyable as possible. We are passionate about
          education and believe that it is a powerful tool for personal and
          professional growth. We are committed to providing our students with
          the highest quality education and support to help them achieve their
          goals. Thank you for considering our online course provider. We look
          forward to helping you achieve your learning goals!
        </Text>
        {/* <Link to="/subscribe">
          <Button variant="ghost" colorScheme={'yellow'}>
            Checkout Our Plan
          </Button>
        </Link> */}
      </Stack>
      {/* <VidePlayer /> */}
      {/* <TAndC terms={terms} />
      <HStack my="4" p="4">
        <RiSecurePaymentFill />
        <Heading size={'xs'} fontFamily="sans-serif" textTransform="uppercase">
          Payment is secure by Razorpay
        </Heading>
      </HStack> */}
    </Container>
  );
};

export default About;

const Founder = () => (
  <Stack direction={['column', 'row']} spacing={['4', '6']} padding={'8'}>
    <VStack>
      <Avatar
        src="https://avatars.githubusercontent.com/u/67426155?v=4"
        boxSize={['40', '48']}
      />
      <Text opacity={'0.7'}>Co-Founder</Text>
    </VStack>
    <VStack justifyContent="center" alignItems={['center', 'flex-start']}>
      <Heading size={['md', 'xl']}>Jaskaran Singh</Heading>
      <Text textAlign={['center', 'left']}>
        Hi, I am a Full Stack Developer
      </Text>
    </VStack>
  </Stack>
);

// const VidePlayer = () => (
//   <Box>
//     <video
//       autoPlay
//       muted
//       controls
//       controlsList="nodownload nofullscreen noremoteplayback"
//       disablePictureInPicture
//       disableRemotePlayback
//       src={Vd}
//     ></video>
//   </Box>
// );

// const TAndC = props => (
//   <Box>
//     <Heading size="md" my="4" textAlign={['center', 'left']}>
//       Terms & Condition
//     </Heading>
//     <Box h="sm" p="4" overflowY="scroll">
//       <Text
//         textAlign={['center', 'left']}
//         letterSpacing="widest"
//         fontFamily="heading"
//       >
//         {props.terms}
//       </Text>
//       <Heading mt="4" size="xs">
//         Refund only applicable for cancellation within 7 days
//       </Heading>
//     </Box>
//   </Box>
// );
