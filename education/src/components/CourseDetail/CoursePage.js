import {
  Accordion,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Layout/Loader/Loader';
import { getCourseLectures } from '../../redux/actions/course';
import './CoursePage.css';
import { FaBars, FaPauseCircle } from 'react-icons/fa';
import { AiFillCrown, AiFillPlayCircle } from 'react-icons/ai';

const CoursePage = ({ user, width }) => {
  const [lectureNo, setlectureNo] = useState(0);
  const { lectures, loading, courses } = useSelector(state => state.courses);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const params = useParams();
  const courseId = params.id;
  const Name = courses.map(course => {
    if (params.id === course._id) return course.title;
  });
  useEffect(() => {
    dispatch(getCourseLectures(courseId));
  }, [dispatch, courseId]);

  const check = user.courseBuy.find(c => c.course === courseId);
  // if (user.role !== 'admin' && check === undefined) {
  //   return <Navigate to={`/subscribe/${params.id}`} />;
  // }
  return loading ? (
    <Loader />
  ) : (
    <Grid minH="90vh" m="5">
      {width < 800 && lectures.length > 0 && (
        <HStack mb="10" alignItems={'center'} mt="10">
          <Button onClick={onOpen}>
            <FaBars />
          </Button>
          <Heading textAlign={'center'}>{Name}</Heading>
        </HStack>
      )}

      {lectures && lectures.length > 0 ? (
        <div className="course-lecture">
          <Box style={{ flex: '0.7' }}>
            <Heading m="4" fontSize={'25px'}>{`${
              lectures && lectures[lectureNo].title
            }`}</Heading>
            <video
              width="100%"
              style={{ borderRadius: '10px', border: '1px solid gray' }}
              autoPlay
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNo].video.url}
            ></video>

            <Heading m="4" fontSize={'20px'} textDecoration="underline">
              Description
            </Heading>
            <Text m="4">{`${lectures[lectureNo].description}`}</Text>
          </Box>
          {width >= 800 && (
            <VStack
              ml="3"
              style={{
                flex: '0.3',
                borderLeft: '1px solid lightgray',
                textAlign: 'left',
              }}
            >
              {width >= 800 && (
                <Box
                  style={{ border: '1px solid', padding: '30px' }}
                  spacing={4}
                  width={'100%'}
                >
                  <Heading
                    textAlign={'left'}
                    fontSize="20px"
                    color={'yellow.600'}
                  >
                    {Name}
                  </Heading>
                  <Heading textAlign={'left'} fontSize="15px" mt="2">
                    {lectures.length} Lessons
                  </Heading>
                </Box>
              )}

              {user.role !== 'admin' && check === undefined ? (
                <>
                  {lectures &&
                    lectures.map((item, index) => (
                      <LectureCard2
                        key={item._id}
                        item={item}
                        setlectureNo={setlectureNo}
                        index={index}
                        lectureNo={lectureNo}
                        courseId={courseId}
                      />
                    ))}
                </>
              ) : (
                <>
                  {lectures &&
                    lectures.map((item, index) => (
                      <LectureCard
                        key={item._id}
                        item={item}
                        setlectureNo={setlectureNo}
                        index={index}
                        lectureNo={lectureNo}
                        onClose={onClose}
                      />
                    ))}
                </>
              )}
            </VStack>
          )}
        </div>
      ) : (
        <Heading textAlign={'center'}>No Lectures Found</Heading>
      )}
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">{Name}</DrawerHeader>
          <DrawerBody>
            <Accordion allowMultiple>
              {user.role !== 'admin' && check === undefined ? (
                <>
                  {lectures &&
                    lectures.map((item, index) => (
                      <LectureCard2
                        key={item._id}
                        item={item}
                        setlectureNo={setlectureNo}
                        index={index}
                        lectureNo={lectureNo}
                        courseId={courseId}
                      />
                    ))}
                </>
              ) : (
                <>
                  {lectures &&
                    lectures.map((item, index) => (
                      <LectureCard
                        key={item._id}
                        item={item}
                        setlectureNo={setlectureNo}
                        index={index}
                        lectureNo={lectureNo}
                        onClose={onClose}
                      />
                    ))}
                </>
              )}
            </Accordion>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Grid>
  );
};

export default CoursePage;

const LectureCard = ({ setlectureNo, item, index, lectureNo, onClose }) => {
  const [videoDuration, setvideoDuration] = useState(0);

  const videoEl = useRef(null);

  const handleLoadedMetadata = () => {
    const video = videoEl.current;
    if (!video) return;
    setvideoDuration(`${video.duration}`);
  };
  return (
    <button
      onClick={() => {
        setlectureNo(index);
        onClose();
      }}
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
      <video
        width="100px"
        height={'130px'}
        style={{ borderRadius: '10px', flex: '0.3', border: '1px solid gray' }}
        src={item.video.url}
        ref={videoEl}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <Box style={{ display: 'flex', flexDirection: 'column', flex: '0.6' }}>
        <Heading
          fontSize={'16px'}
          textAlign="left"
          color={lectureNo === index && 'yellow.600'}
        >{`${item.title}`}</Heading>
        <Heading
          fontSize={'10px'}
          textAlign="left"
          color="gray"
          mt="2"
        >{`${Math.floor(videoDuration / 60)} Min`}</Heading>
      </Box>
      {lectureNo === index ? (
        <FaPauseCircle
          size={'30px'}
          flex={'0.1'}
          style={{ color: '#b7791f' }}
        />
      ) : (
        <AiFillPlayCircle size={'30px'} flex={'0.1'} />
      )}
    </button>
  );
};
const LectureCard2 = ({ setlectureNo, item, index, lectureNo, courseId }) => {
  const [videoDuration, setvideoDuration] = useState(0);

  const videoEl = useRef(null);

  const handleLoadedMetadata = () => {
    const video = videoEl.current;
    if (!video) return;
    setvideoDuration(`${video.duration}`);
  };
  return (
    <Link
      to={`/subscribe/${courseId}`}
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
      <video
        width="100px"
        height={'130px'}
        style={{
          borderRadius: '10px',
          flex: '0.3',
          border: '1px solid gray',
        }}
        src={item.video.url}
        ref={videoEl}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <Box style={{ display: 'flex', flexDirection: 'column', flex: '0.6' }}>
        <Heading
          fontSize={'16px'}
          textAlign="left"
          color={lectureNo === index && 'yellow.600'}
        >{`${item.title}`}</Heading>
        <Heading
          fontSize={'10px'}
          textAlign="left"
          color="gray"
          mt="2"
        >{`${Math.floor(videoDuration / 60)} Min`}</Heading>
      </Box>
      {index === 0 ? (
        <FaPauseCircle
          size={'30px'}
          flex={'0.1'}
          style={{ color: '#b7791f' }}
        />
      ) : (
        <AiFillCrown size={'30px'} flex={'0.1'} style={{ color: '#b7791f' }} />
      )}
    </Link>
  );
};
