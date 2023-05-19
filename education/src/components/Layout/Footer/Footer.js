import { Box, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
} from 'react-icons/ti';
import { DiGithub } from 'react-icons/di';
import Icon from '../../../assets/Images/favicon.ico';
const Footer = () => {
  return (
    <Box podding={'4'} bg="blackAlpha.900" minH={'10vh'} padding="10">
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width="full">
          <Heading color="white">All Rights Reserved</Heading>
          <Box display={'flex'} alignItems="center">
            <Image src={Icon} mr="2" width={'30px'} height="30px" />
            <Text fontSize={20} fontWeight={'bold'} fontFamily="Marmelad" color={'white'}>
              SmartUpJr
            </Text>
          </Box>
        </VStack>
        <HStack
          spacing={['2', '10']}
          justifyContent="center"
          color="white"
          fontSize="50"
        >
          <a href="https://www.youtube.com/@firststepstudy7920" target={'blank'}>
            <TiSocialYoutubeCircular />
          </a>
          <a href="https://www.instagram.com/hsjava_classes_/" target={'blank'}>
            <TiSocialInstagramCircular />
          </a>
          <a href="https://github.com/jaskaran5109" target={'blank'}>
            <DiGithub />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
