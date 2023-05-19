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
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
const NoteModel = ({
  notesnote,
  isOpen,
  onClose,
  id,
  deleteHandler,
  noteTitle,
  addTopicHandler,
  loading,
}) => {
  const [title, setTitle] = useState('');
  const [docFile, setdocFile] = useState('');
  const [docPrev, setDocPrev] = useState('');
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
  const changeDocHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setDocPrev(reader.result);
      setdocFile(file);
    };
  };
  const handleClose = () => {
    setTitle('');
    setdocFile('');
    setDocPrev('');
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
        <ModalHeader>{noteTitle}</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody p="16">
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box p={['0', '16']}>
              <Box my="5">
                <Heading>{noteTitle}</Heading>
                <Heading size="sm" opacity={'0.4'}>{`#${id}`}</Heading>
              </Box>
              <Heading size="lg">Topics</Heading>
              {notesnote.map((item, index) => (
                <TitleCard
                  key={index}
                  title={item.title}
                  numOfTopics={index + 1}
                  notesId={item._id}
                  noteId={id}
                  deleteHandler={deleteHandler}
                  loading={loading}
                />
              ))}
            </Box>
            <Box>
              <form onSubmit={e => addTopicHandler(e, id, title, docFile)}>
                <VStack spacing={'4'}>
                  <Heading size="md" textTransform={'uppercase'}>
                    ADD Notes
                  </Heading>
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />

                  <Input
                    type="file"
                    required
                    id="file"
                    accept='application/pdf'
                    focusBorderColor="purple.300"
                    css={fileIploadStyle}
                    onChange={changeDocHandler}
                  />
                  {docPrev && (
                    <Box
                      height={'auto'}
                      width={"40"}
                    >
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                        <Viewer fileUrl={docPrev} />
                      </Worker>
                    </Box>
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

export default NoteModel;
function TitleCard({
  title,
  numOfTopics,
  notesId,
  noteId,
  deleteHandler,
  loading,
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
        <Heading size="sm">{`#${numOfTopics} ${title}`}</Heading>
      </Box>
      <Button
        onClick={() => deleteHandler(noteId, notesId)}
        color="purple.600"
        isLoading={loading}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
