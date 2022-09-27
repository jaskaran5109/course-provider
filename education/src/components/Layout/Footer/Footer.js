import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
} from 'react-icons/ti';
import { DiGithub } from 'react-icons/di';
const Footer = () => {
  return (
    <Box podding={'4'} bg="blackAlpha.900" minH={'10vh'} padding="10" >
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width="full">
          <Heading color="white">All Rights Reserved</Heading>
          <Heading color="yellow.400" fontFamily={'body'} size={'sm'}>
            FirstStepStudy
          </Heading>
        </VStack>
        <HStack spacing={['2', '10']} justifyContent="center" color="white"
            fontSize="50"
        >
          <a href="" target={"blank"}>
            <TiSocialYoutubeCircular />
          </a>
          <a href="" target={"blank"}>
            <TiSocialInstagramCircular />
          </a>
          <a href="" target={"blank"}>
            <DiGithub />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
