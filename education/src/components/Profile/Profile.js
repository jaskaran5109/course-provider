import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  ModalOverlay,
  Stack,
  Text,
  ModalContent,
  Modal,
  VStack,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  useDisclosure,
  ModalHeader,
} from '@chakra-ui/react';
import { cancelSubscription, getMyProfile } from '../../redux/actions/user';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromPlaylist,
  updateProfilePicture,
} from '../../redux/actions/profile';
const Profile = ({ user }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.profile);
  const {
    loading: loading2,
    message: message2,
    error: error2,
  } = useSelector(state => state.subscription);

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('file', image);
    await dispatch(updateProfilePicture(myForm));
    dispatch(getMyProfile());
  };
  const removeFromPlaylistHandler = async id => {
    await dispatch(removeFromPlaylist(id));
    dispatch(getMyProfile());
  };
  const cancelSubscriptionHandler = () => {
    dispatch(cancelSubscription());
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

    if (error2) {
      toast.error(error2);
      dispatch({ type: 'clearError' });
    }
    if (message2) {
      toast.success(message2);
      dispatch({ type: 'clearMessage' });
      dispatch(getMyProfile())
    }
  }, [dispatch, error, message, error2, message2]);

  return (
    <Container minH={'95vh'} maxW="container.lg" py="8">
      <Heading m="8" textTransform={'uppercase'}>
        Profile
      </Heading>
      <Stack
        justifyContent="flex-start"
        direction={['column', 'row']}
        alignItems="center"
        spacing={['8', '16']}
        padding="8"
      >
        <VStack>
          <Avatar boxSize="48" src={user.avatar.url} />
          <Button onClick={onOpen} colorScheme={'yellow'} variant="ghost">
            Change Photo
          </Button>
        </VStack>
        <VStack spacing="4" alignItems={['center', 'flex-start']}>
          <HStack>
            <Text fontWeight={'bold'}>Name</Text>
            <Text>{user.name}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={'bold'}>Email</Text>
            <Text>{user.email}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={'bold'}>Created At</Text>
            <Text>{user.createdAt.split('T')[0]}</Text>
          </HStack>
          {user.role !== 'admin' && (
            <HStack>
              <Text fontWeight={'bold'}>Subscription</Text>
              {user.subscription && user.subscription.status === 'active' ? (
                <Button
                  color={'yellow.500'}
                  onClick={cancelSubscriptionHandler}
                  isLoading={loading2}
                >
                  Cancel Subscription
                </Button>
              ) : (
                <Link to="/subscribe">
                  <Button colorScheme={'yellow'}>Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}
          <Stack direction={['column', 'row']} alignItems="center">
            <Link to="/updateProfile">
              <Button>Update Profile</Button>
            </Link>
            <Link to="/changePassword">
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>
      <Heading size={'md'} my="8">
        Playlist
      </Heading>
      {user.playlist.length > 0 && (
        <Stack
          direction={['column', 'row']}
          alignItems="center"
          flexWrap="wrap"
          p="4"
        >
          {user.playlist.map(item => (
            <VStack w="48" m="2" key={item.course}>
              <Image boxSize={'full'} objectFit="contain" src={item.poster} />
              <HStack>
                <Link to={`/course/${item.course}`}>
                  <Button variant={'ghost'} colorScheme="yellow">
                    Watch Now
                  </Button>
                </Link>
                <Button
                  onClick={() => removeFromPlaylistHandler(item.course)}
                  isLoading={loading}
                >
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}
      <ChangePhotoBox
        loading={loading}
        isOpen={isOpen}
        onClose={onClose}
        changeImageSubmitHandler={changeImageSubmitHandler}
      />
    </Container>
  );
};

export default Profile;

const ChangePhotoBox = ({
  loading,
  isOpen,
  onClose,
  changeImageSubmitHandler,
}) => {
  const [image, setImage] = useState();
  const [imagePrev, setimagePrev] = useState();

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setimagePrev(reader.result);
      setImage(file);
    };
  };
  const closeHandler = () => {
    onClose();
    setimagePrev('');
    setImage('');
  };
  const fileIploadCss = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',
    color: '#ECC94B',
    backgroundColor: 'white',
  };
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <VStack spacing="8">
                {imagePrev && <Avatar boxSize={'48'} src={imagePrev} />}
                <Input
                  onChange={changeImageHandler}
                  type={'file'}
                  css={{ '&::file-selector-button': fileIploadCss }}
                />
                <Button
                  isLoading={loading}
                  w="full"
                  colorScheme="yellow"
                  type="submit"
                >
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button mr="3" onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
