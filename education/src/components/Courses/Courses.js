import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../../redux/actions/course';
import { addToPlaylist } from '../../redux/actions/profile';
import { getMyProfile } from '../../redux/actions/user';
import Loader from '../Layout/Loader/Loader';

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const { loading, courses, error, message } = useSelector(
    state => state.courses
  );
  const dispatch = useDispatch();
  const categories = [
    'All',
    'Web Development',
    'Artificial Intelligence',
    'Data Structure & Algorithms',
    'Java',
    'Game Development',
  ];
  useEffect(() => {
    dispatch(getAllCourses(category, keyword));
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, category, keyword, error, message]);

  const addToPlaylistHandler = async id => {
    await dispatch(addToPlaylist(id));
    dispatch(getMyProfile());
  };
  return (
    <Container minHeight={'95vh'} maxWidth={'container.lg'} paddingY={'8'}>
      <Heading m={'8'}>All Courses</Heading>
      <Input
        type="text"
        focusBorderColor="yellow.500"
        placeholder="Search a course..."
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      <HStack overflowX={'auto'} paddingY="8">
        {categories.map((item, index) => (
          <Button
            minWidth={'60'}
            onClick={() => {
              if (item === 'All') setCategory('');
              else setCategory(item);
            }}
            key={index}
          >
            <Text>{item}</Text>
          </Button>
        ))}
      </HStack>
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
          {courses.length > 0 ? (
            courses.map((item, index) => (
              <CourseCard
                key={item._id}
                title={item.title}
                description={item.description}
                views={item.views}
                imageSrc={item.poster.url}
                id={item._id}
                creator={item.createdBy}
                lectureCount={item.numOfVideos}
                addToPlaylist={addToPlaylistHandler}
                loading={loading}
              />
            ))
          ) : (
            <Heading opacity={'0.5'}>No Course found</Heading>
          )}
        </Stack>
      )}
    </Container>
  );
};

export default Courses;
const CourseCard = ({
  title,
  imageSrc,
  id,
  views,
  addToPlaylist,
  creator,
  description,
  lectureCount,
  loading,
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image
        src={imageSrc}
        objectFit={'contain'}
        style={{ width: '250px', height: '150px' }}
      />
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
      <Heading
        textAlign={'center'}
        size={'xs'}
        textTransform={'uppercase'}
      >{`Lectures - ${lectureCount}`}</Heading>
      <Heading
        size={'xs'}
        textTransform={'uppercase'}
      >{`Users - ${views}`}</Heading>
      <Stack direction={['column', 'row']} alignItems="center">
        <Link to={`/course/${id}`} state={{ name: `${title}` }}>
          <Button colorScheme={'yellow'}>Watch Now</Button>
        </Link>
        <Button
          colorScheme={'yellow'}
          variant="ghost"
          isLoading={loading}
          onClick={() => addToPlaylist(id)}
        >
          Add To Playlist
        </Button>
      </Stack>
    </VStack>
  );
};
