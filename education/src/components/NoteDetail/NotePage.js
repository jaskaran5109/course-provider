import {
  Accordion,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Link, useParams } from 'react-router-dom';
import './NodePage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getNoteNotes } from '../../redux/actions/note';
import axios from 'axios';
import { server } from '../../redux/store';
import { FaBars } from 'react-icons/fa';
const NotePage = ({width}) => {
  const [lectureNo, setlectureNo] = useState(0);
  const [tit, settit] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notesnote } = useSelector(state => state.notes);

  const dispatch = useDispatch();
  const params = useParams();

  const getNoteData = async () => {
    const { data } = await axios.get(`${server}/single/note/${params.id}`);
    settit(data.notes.title);
    setCreatedBy(data.notes.createdBy);
  };

  useEffect(() => {
    dispatch(getNoteNotes(params.id));
    getNoteData();
  }, [dispatch, params.id]);

  return (
    <div>
      <HStack
        alignItems={'center'}
        spacing={4}
        marginTop={['100px', '100px']}
        ml={['10px', '30px']}
      >
        {width<900 && <Button onClick={onOpen}>
          <FaBars />
        </Button>}
        <Heading as={Link} to={'/notes'} fontWeight={'normal'} size={'md'}>
          {tit}
        </Heading>
      </HStack>
      <div minH="90vh" m="3" className="grid">
        <Box height={'auto'} margin={['5px', '16px']} className="sidebar1">
          {notesnote.length > 0 && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
              <Viewer fileUrl={notesnote[lectureNo].docFile.url} />
            </Worker>
          )}
        </Box>
        <VStack m="3" className="sidebar2">
          {notesnote &&
            notesnote.map((item, index) => (
              <button
                onClick={() => setlectureNo(index)}
                key={item._id}
                style={{
                  width: '100%',
                  padding: '1rem',
                  marginBottom: '2px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text>{`${item.title}`}</Text>
              </button>
            ))}
        </VStack>
      </div>
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth={'1px'}
            display={'flex'}
            alignItems={'center'}
          >
            <Heading size={'sm'} as={Link} to={'/'} onClick={onClose}>
              {tit}
            </Heading>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody p={0}>
            <Accordion allowMultiple>
              {notesnote &&
                notesnote.map((item, index) => (
                  <button
                    onClick={() => {
                      setlectureNo(index);
                      onClose();
                    }}
                    key={item._id}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      textAlign: 'left',
                      margin: 0,
                      borderBottom: '1px solid',
                    }}
                  >
                    <Text>{`${item.title}`}</Text>
                  </button>
                ))}
            </Accordion>
          </DrawerBody>
          <DrawerFooter
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            borderTopWidth={'1px'}
          >
            <Text colorScheme={'red'} size="sm">
              Created By: {createdBy}
            </Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default NotePage;
