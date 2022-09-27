import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';

const CourseModel = ({
  lectures,
  isOpen,
  onClose,
  id,
  deleteHandler,
  courseTitle,
  addLectureHandler,
  loading,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');
  const fileIploadCss = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',
    color: 'purple',
    backgroundColor: 'white',
  };
  const fileIploadStyle = {
    '&::file-selector-button': fileIploadCss,
  };
  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };
  const handleClose = () => {
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      size="full"
      onClose={handleClose}
      scrollBehavior={'inside'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody p="16">
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box p={['0', '16']}>
              <Box my="5">
                <Heading>{courseTitle}</Heading>
                <Heading size="sm" opacity={'0.4'}>{`#${id}`}</Heading>
              </Box>
              <Heading size="lg">Lectures</Heading>
              {lectures.map((item, index) => (
                <VideoCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  numOfVideos={index + 1}
                  lectureId={item._id}
                  courseId={id}
                  deleteHandler={deleteHandler}
                  loading={loading}
                />
              ))}
            </Box>
            <Box>
              <form
                onSubmit={e =>
                  addLectureHandler(e, id, title, description, video)
                }
              >
                <VStack spacing={'4'}>
                  <Heading size="md" textTransform={'uppercase'}>
                    ADD LECTURE
                  </Heading>
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />

                  <Input
                    type="file"
                    accept="video/mp4"
                    required
                    id="file"
                    focusBorderColor="purple.300"
                    css={fileIploadStyle}
                    onChange={changeVideoHandler}
                  />
                  {videoPrev && (
                    <video
                      controlsList="nodownload"
                      controls
                      src={videoPrev}
                    ></video>
                  )}
                  <Button
                    w="full"
                    isLoading={loading}
                    colorScheme={'purple'}
                    type="submit"
                  >
                    Upload
                  </Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModel;
function VideoCard({
  title,
  numOfVideos,
  description,
  lectureId,
  courseId,
  deleteHandler,
  loading
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my="8"
      p={['4', '8']}
      justifyContent={['flex-start', 'space-between']}
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
    >
      <Box>
        <Heading size="sm">{`#${numOfVideos} ${title}`}</Heading>
        <Text>{description}</Text>
      </Box>
      <Button
        onClick={() => deleteHandler(courseId, lectureId)}
        color="purple.600"
        isLoading={loading}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
