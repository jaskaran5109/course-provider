import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Vd from '../../assets/Videos/video.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';
import terms from '../../assets/Docs/terms'
const About = () => {
  return (
    <Container maxWidth={'container.lg'} padding="16" boxShadow="dark-lg">
      <Heading textAlign={['center', 'left']}>About Us</Heading>
      <Founder />
      <Stack m="8" direction={['column', 'row']} alignItems="center">
        <Text fontFamily="cursive" m="8" textAlign={['center', 'left']}>
          We are e-learning platform that provides course to students for better
          future
        </Text>
        <Link to="/subscribe">
          <Button variant="ghost" colorScheme={'yellow'}>
            Checkout Our Plan
          </Button>
        </Link>
      </Stack>
      <VidePlayer />
      <TAndC terms={terms} />
      <HStack my="4" p="4">
        <RiSecurePaymentFill />
        <Heading size={'xs'} fontFamily="sans-serif" textTransform="uppercase">
          Payment is secure by Razorpay
        </Heading>
      </HStack>
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

const VidePlayer = () => (
  <Box>
    <video
      autoPlay
      muted
      controls
      controlsList="nodownload nofullscreen noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
      src={Vd}
    ></video>
  </Box>
);

const TAndC = props => (
  <Box>
    <Heading size="md" my="4" textAlign={['center', 'left']}>
      Terms & Condition
    </Heading>
    <Box h="sm" p="4" overflowY="scroll">
      <Text
        textAlign={['center', 'left']}
        letterSpacing="widest"
        fontFamily="heading"
      >
        {props.terms}
      </Text>
      <Heading mt="4" size="xs">Refund only applicable for cancellation within 7 days</Heading>
    </Box>
  </Box>
);
