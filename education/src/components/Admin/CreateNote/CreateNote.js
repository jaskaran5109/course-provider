import {
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  Heading,
  HStack,
  Image,
  Input,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { createNote } from '../../../redux/actions/admin';
import Sidebar from '../Sidebar';
import { FaBars } from 'react-icons/fa';
const fileIploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: 'purple',
  backgroundColor: 'white',
};
const CreateNote = ({ width }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { loading, error, message } = useSelector(state => state.admin);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [image, setImage] = useState();
  const [imagePrev, setImagePrev] = useState();
  const dispatch = useDispatch();
  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };
  const fileIploadStyle = {
    '&::file-selector-button': fileIploadCss,
  };
  const submitHanlder = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('createdBy', createdBy);
    myForm.append('file', image);
    dispatch(createNote(myForm));
    setTitle('');
    setDescription('');
    setCreatedBy('');
    setImage('');
    setImagePrev('');
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);
  return (
    <>
      {width < 900 ? (
        <Grid minH="100vh" >
          <Container py="16">
            <form onSubmit={submitHanlder}>
              <HStack my="16">
                <Button onClick={onOpen}>
                  <FaBars />
                </Button>
                <Heading
                  textTransform={'uppercase'}
                  
                  textAlign='center'
                >
                  Create Note
                </Heading>
              </HStack>
              <VStack spacing="8" m="auto">
                <Input
                  id="name"
                  value={title}
                  placeholder="Title"
                  onChange={e => setTitle(e.target.value)}
                  type="text"
                  focusBorderColor="purple.300"
                />
                <Input
                  id="name"
                  value={description}
                  placeholder="Description"
                  onChange={e => setDescription(e.target.value)}
                  type="text"
                  focusBorderColor="purple.300"
                />
                <Input
                  id="createdBy"
                  value={createdBy}
                  placeholder="Created By"
                  onChange={e => setCreatedBy(e.target.value)}
                  type="text"
                  focusBorderColor="purple.300"
                />
                <Input
                  type="file"
                  accept="image/*"
                  required
                  id="file"
                  focusBorderColor="purple.300"
                  css={fileIploadStyle}
                  onChange={changeImageHandler}
                />
                {imagePrev && (
                  <Image src={imagePrev} boxSize="64" objectFit="contain" />
                )}
                <Button
                  isLoading={loading}
                  w="full"
                  colorScheme={'purple'}
                  type="submit"
                >
                  Create
                </Button>
              </VStack>
            </form>
          </Container>
        </Grid>
      ) : (
        <Grid minH="100vh" templateColumns={['1fr', '5fr 1fr']}>
          <Container py="16">
            <form onSubmit={submitHanlder}>
              <Heading
                textTransform={'uppercase'}
                my="16"
                textAlign='center'
              >
                Create Note
              </Heading>
              <VStack spacing="8" m="auto">
                <Input
                  id="name"
                  value={title}
                  placeholder="Title"
                  onChange={e => setTitle(e.target.value)}
                  type="text"
                  focusBorderColor="purple.300"
                />
                <Input
                  id="name"
                  value={description}
                  placeholder="Description"
                  onChange={e => setDescription(e.target.value)}
                  type="text"
                  focusBorderColor="purple.300"
                />
                <Input
                  id="createdBy"
                  value={createdBy}
                  placeholder="Created By"
                  onChange={e => setCreatedBy(e.target.value)}
                  type="text"
                  focusBorderColor="purple.300"
                />
                <Input
                  type="file"
                  accept="image/*"
                  required
                  id="file"
                  focusBorderColor="purple.300"
                  css={fileIploadStyle}
                  onChange={changeImageHandler}
                />
                {imagePrev && (
                  <Image src={imagePrev} boxSize="64" objectFit="contain" />
                )}
                <Button
                  isLoading={loading}
                  w="full"
                  colorScheme={'purple'}
                  type="submit"
                >
                  Create
                </Button>
              </VStack>
            </form>
          </Container>
          <Sidebar />
        </Grid>
      )}
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">SmartUpJr</DrawerHeader>
          <DrawerBody>
            <Sidebar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateNote;
