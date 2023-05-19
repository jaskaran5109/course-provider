import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { getAllNotes } from '../../redux/actions/note';
import Loader from '../Layout/Loader/Loader';
const Notes = () => {
  const { loading, notes, error, message } = useSelector(state => state.notes);
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
  return (
    <Container minHeight={'95vh'} maxWidth={'container.lg'} paddingY={'8'}>
      <Heading m={'8'}>Course Notes</Heading>
      {loading ? (
        <Loader />
      ) : (
        <Stack
          direction={['column', 'row']}
          flexWrap="wrap"
          justifyContent={['flex-start', 'space-evenly']}
          alignItems={['center', 'flex-start']}
          mt="5"
        >
          {notes && notes.length > 0 ? (
            notes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                description={item.description}
                imageSrc={item.poster.url}
                id={item._id}
                creator={item.createdBy}
                loading={loading}
              />
            ))
          ) : (
            <Heading opacity={'0.5'}>No Note found</Heading>
          )}
        </Stack>
      )}
    </Container>
  );
};

export default Notes;

const NoteCard = ({ title, imageSrc, id, creator, description, loading }) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
      <Heading
        size={'sm'}
        textAlign={['center', 'left']}
        maxWidth="200px"
        noOfLines={3}
      >
        {title}
      </Heading>
      <Text noOfLines={2}>{description}</Text>
      <HStack>
        <Text fontWeight={'bold'} textTransform={'uppercase'}>
          Creator
        </Text>
        <Text
          fontWeight={'bold'}
          fontFamily={'body'}
          textTransform={'uppercase'}
        >
          {creator}
        </Text>
      </HStack>
      <Stack direction={['column', 'row']} alignItems="center">
        <Link to={`/note/${id}`}>
          <Button colorScheme={'yellow'}>Open Now</Button>
        </Link>
      </Stack>
    </VStack>
  );
};
