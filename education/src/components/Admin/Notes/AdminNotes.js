import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import Sidebar from '../Sidebar';
import NoteModel from './NoteModel';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotes, getNoteNotes } from '../../../redux/actions/note';
import {
  addNoteNote,
  deleteNote,
  deleteNoteNote,
} from '../../../redux/actions/admin';
const AdminNotes = ({ width }) => {
  const [noteIdss, setNoteId] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { notes, notesnote } = useSelector(state => state.notes);
  const { loading, error, message } = useSelector(state => state.admin);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllNotes());
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);
  const topicDetailsHandler = (id, title) => {
    dispatch(getNoteNotes(id));
    onOpen();
    setNoteId(id);
    setNoteTitle(title);
  };
  const deletetopicHandler = id => {
    dispatch(deleteNote(id));
  };
  const deleteHandler = async (noteId, notesId) => {
    await dispatch(deleteNoteNote(noteId, notesId));
    dispatch(getNoteNotes(noteId));
  };
  const addTopicHandler = async (e, id, title, docFile) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('file', docFile);
    await dispatch(addNoteNote(id, myForm));
    dispatch(getNoteNotes(id));
  };
  return (
    <>
      {width < 900 ? (
        <Grid minH="100vh" mt="10">
          <Box p={['0', '8']} overflow="auto">
            <HStack my="16">
              <Heading
                textTransform={'uppercase'}
                textAlign={['center', 'left']}
              >
                All Notes
              </Heading>
            </HStack>
            <TableContainer w={['100vw', 'full']}>
              <Table variant="simple" size="lg">
                <TableCaption>All available Notes in the Database</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Poster</Th>
                    <Th>Title</Th>
                    <Th>Creator</Th>
                    <Th isNumeric>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {notes.map(
                    item =>
                      item.user === user._id && (
                        <Row
                          item={item}
                          key={item._id}
                          topicDetailsHandler={topicDetailsHandler}
                          deletetopicHandler={deletetopicHandler}
                          loading={loading}
                        />
                      )
                  )}
                </Tbody>
              </Table>
            </TableContainer>
            <NoteModel
              isOpen={isOpen}
              onClose={onClose}
              id={noteIdss}
              deleteHandler={deleteHandler}
              addTopicHandler={addTopicHandler}
              noteTitle={noteTitle}
              notesnote={notesnote}
              loading={loading}
            />
          </Box>
          <Sidebar />
        </Grid>
      ) : (
        <Grid minH="100vh" templateColumns={['1fr', '5fr 1fr']}>
          <Box p={['0', '8']} overflow="auto">
            <Heading
              textTransform={'uppercase'}
              my="16"
              textAlign={['center', 'left']}
            >
              All Notes
            </Heading>
            <TableContainer w={['100vw', 'full']}>
              <Table variant="simple" size="lg">
                <TableCaption>All available Notes in the Database</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Poster</Th>
                    <Th>Title</Th>
                    <Th>Creator</Th>
                    <Th isNumeric>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {notes.map(
                    item =>
                      item.user === user._id && (
                        <Row
                          item={item}
                          key={item._id}
                          topicDetailsHandler={topicDetailsHandler}
                          deletetopicHandler={deletetopicHandler}
                          loading={loading}
                        />
                      )
                  )}
                </Tbody>
              </Table>
            </TableContainer>
            <NoteModel
              isOpen={isOpen}
              onClose={onClose}
              id={noteIdss}
              deleteHandler={deleteHandler}
              addTopicHandler={addTopicHandler}
              noteTitle={noteTitle}
              notesnote={notesnote}
              loading={loading}
            />
          </Box>

          <Sidebar />
        </Grid>
      )}
    </>
  );
};

export default AdminNotes;

function Row({ item, topicDetailsHandler, loading, deletetopicHandler }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} height="10" />
      </Td>
      <Td>{item.title}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>
        <HStack justifyContent="flex-end">
          <Button
            variant="outline"
            color="puprle.500"
            onClick={() => topicDetailsHandler(item._id, item.title)}
            isLoading={loading}
          >
            View Topics
          </Button>
          <Button
            isLoading={loading}
            color="puprle.600"
            onClick={() => deletetopicHandler(item._id)}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
