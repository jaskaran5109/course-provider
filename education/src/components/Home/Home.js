import React from 'react';
import { Box, Button, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';
import './home.css';
import { Link } from 'react-router-dom';
import home from '../../assets/Images/home.png'
import {CgGoogle,CgYoutube} from 'react-icons/cg'
import {SiCoursera,SiUdemy} from 'react-icons/si'
import {DiAws} from 'react-icons/di'
import Vd from '../../assets/Videos/video.mp4'
const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={['column', 'row']}
          height="100%"
          justifyContent={['center', 'space-between']}
          alignItems="center"
          spacing={['16', '56']}
        >
          <VStack width={"full"} alignItems={["center","flex-end"]} spacing="8">
            <Heading children="Learn from the xpert" size={"2xl"}/>
            <Text fontSize={"2xl"} textAlign={["center","left"]}>Find Valueable Content At Reasonable Price</Text>
            <Link to="/courses">
              <Button size={"lg"} colorScheme="yellow">Enroll Now</Button>
            </Link>
          </VStack>

          <Image boxSize={"md"} src={home} objectFit="contain" className='homeImage'/>
        </Stack>
      </div>
      <Box padding={"8"} bg="blackAlpha.800">
        <Heading children="OUR BRANDS"textAlign={"center"} fontFamily="body" color={"yellow.400"}/>
        <HStack className="brandsBanner" justifyContent="space-evenly" marginTop={"4"}>
          <CgGoogle/>
          <CgYoutube/>
          <SiCoursera/>
          <SiUdemy/>
          <DiAws/>
        </HStack>
      </Box>
      <div className="container2">
        <video autoPlay controls controlsList='nodownload nofullscreen noremoteplayback' disablePictureInPicture 
        disableRemotePlayback
       src={Vd}></video>
      </div>
    </section>
  );
};

export default Home;
