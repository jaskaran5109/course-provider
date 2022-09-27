import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import Loader from '../Layout/Loader/Loader';
import { getCourseLectures } from '../../redux/actions/course';
const CoursePage = ({ user }) => {
  const [lectureNo, setlectureNo] = useState(0);
  const { lectures, loading } = useSelector(state => state.courses);

  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id]);
  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to={'/subscribe'} />;
  }

  return loading ? (
    <Loader />
  ) : (
    <Grid minH="90vh" templateColumns={['1fr', '3fr 1fr']} m="3" mt="20">
      {lectures && lectures.length > 0 ? (
        <>
          <Box>
            <video
              width="100%"
              style={{ borderRadius: '10px' }}
              autoPlay
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNo].video.url}
            ></video>
            <Heading m="4">{`#${lectureNo + 1} ${
              lectures && lectures[lectureNo].title
            }`}</Heading>
            <Heading m="4">Description</Heading>
            <Text m="4">{`${lectures[lectureNo].description}`}</Text>
          </Box>
          <VStack m="3">
            {lectures &&
              lectures.map((item, index) => (
                <button
                  onClick={() => setlectureNo(index)}
                  key={item._id}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    textAlign: 'center',
                    margin: 0,
                    borderBottom: '1px solid',
                  }}
                >
                  <Text>{`#${index + 1} ${item.title}`}</Text>
                </button>
              ))}
          </VStack>
        </>
      ) : (
        <Heading textAlign={'center'}>No Lectures Found</Heading>
      )}
    </Grid>
  );
};

export default CoursePage;
