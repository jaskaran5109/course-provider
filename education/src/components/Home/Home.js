import React, { useEffect } from 'react';
import {
  Avatar,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import './home.css';
import { Link } from 'react-router-dom';
import home from '../../assets/Images/home.png';
import Second from '../../assets/Images/secondDiv.png';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import toast from 'react-hot-toast';

const Home = ({ width }) => {
  const { courses, error, message } = useSelector(state => state.courses);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCourses());
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
    <section className="home">
      <div
        className="container"
        style={{ marginTop: `${width < 800 && '40px'}` }}
      >
        <Stack className="home-first-div" height="100%" alignItems="center">
          <VStack
            width={'full'}
            alignItems={['center', 'flex-start']}
            spacing="8"
          >
            <Heading children="Master Your Skills" size={'2xl'} />
            <Text fontSize={'2xl'} textAlign={['center', 'left']}>
              Advance Your Skills with Online Courses
            </Text>
            <Text fontSize={'20px'} textAlign={['center', 'left']}>
              The idea that online courses can help individuals achieve their
              full potential, and emphasizes the benefits of online learning.
            </Text>
            <Link to="/courses">
              <Button size={'lg'} colorScheme="yellow">
                Xplore{' '}
                <FaLongArrowAltRight
                  style={{ marginLeft: '10px', width: '30px' }}
                />
              </Button>
            </Link>
          </VStack>
          {width > 800 && (
            <Image
              boxSize={'lg'}
              src={home}
              objectFit="contain"
              className="homeImage"
            />
          )}
        </Stack>
        <Stack className="home-second-div" alignItems="center">
          <Image
            boxSize={'lg'}
            src={Second}
            objectFit="contain"
            className="secondImage"
          />
          <VStack
            width={'full'}
            alignItems={['center', 'flex-start']}
            spacing="8"
          >
            <Heading>A few words about</Heading>
            <Text>
              Our platform is user-friendly and accessible from anywhere with an
              internet connection. You can take courses at your own pace and on
              your own schedule. We offer self-paced, instructor-led, and
              interactive courses. Our courses are available on-demand, so you
              can start learning right away.
            </Text>
            <Text>
              Our courses are constantly updated to ensure that you are learning
              the most current and relevant information.We are committed to
              providing you with the best learning experience possible. Start
              your learning journey today!
            </Text>
          </VStack>
        </Stack>
        {courses.length > 0 && (
          <Stack textAlign={'center'} spacing="8" marginTop={'80px'}>
            <Stack className="heading-course" marginBottom={'10'}>
              <VStack>
                <Heading>Popular Courses</Heading>
                <p
                  style={{
                    width: '80px',
                    height: '2px',
                    backgroundColor: '#8185EA',
                    marginRight: 'auto',
                    marginTop: '15px',
                  }}
                ></p>
              </VStack>
              <Link to={`/courses`}>
                <HStack>
                  <Text color={'#8185EA'} fontWeight="bold">
                    View All Courses{' '}
                  </Text>
                  <FaLongArrowAltRight color={'#8185EA'} />
                </HStack>
              </Link>
            </Stack>
            <Stack
              direction={['column', 'row']}
              flexWrap="wrap"
              justifyContent={['flex-start', 'space-evenly']}
              alignItems={['center', 'flex-start']}
            >
              {courses.length > 0 ? (
                courses.map((item, index) => (
                  <HomeCourseCard
                    key={item._id}
                    title={item.title}
                    description={item.description}
                    imageSrc={item.poster.url}
                    id={item._id}
                    lectureCount={item.numOfVideos}
                    category={item.category}
                  />
                ))
              ) : (
                <Heading opacity={'0.5'}>No Course found</Heading>
              )}
            </Stack>
          </Stack>
        )}
        <Stack textAlign={'center'} spacing="8" marginTop={'80px'}>
          <Heading>Success stories from our students</Heading>
          <Text>
            Feel free to learn more about our courses from our students and the
            trustworthy testimonials they have recently submitted.
          </Text>
          <div className="stack-student">
            <HomeStudentCard
              image="https://livedemo00.template-help.com/wt_62466_v3/online-courses/site/images/home-14-86x86.jpg"
              name="Leslie Alexander"
              title="Easy-to-understand courses"
              quote="The material that instructors of Pract use is pretty straightforward yet quite detailed. It’s also very useful to both newbies and professionals. You can choose any course to get started."
            />
            <HomeStudentCard
              title="A wide selection of courses"
              name="Jane Cooper"
              quote="I prefer the range of courses offerd by this online school to any other website. The team of Pract regularly updates their courses list and provides them at a very affordable price."
              image="https://livedemo00.template-help.com/wt_62466_v3/online-courses/site/images/home-15-86x86.jpg"
            />
            <HomeStudentCard
              image="https://livedemo00.template-help.com/wt_62466_v3/online-courses/site/images/home-16-86x86.jpg"
              name="James wilson"
              title="A great knowledge source"
              quote="As a web developer, I’m always trying to learn more about new development tips and tricks. Your online courses provided me with this unique possibility. Thank you!"
            />
          </div>
        </Stack>
      </div>
    </section>
  );
};

export default Home;
const HomeCourseCard = ({
  title,
  imageSrc,
  id,
  description,
  lectureCount,
  category,
}) => {
  return (
    <VStack
      className="course"
      alignItems={['center', 'flex-start']}
      marginBottom={'60px'}
    >
      <Image
        src={imageSrc}
        objectFit={'contain'}
        style={{ width: '250px', height: '150px' }}
      />
      <Text color={'yellow.500'} fontWeight="bold">
        {category.toUpperCase()}
      </Text>
      <Heading size={'sm'} textAlign={'left'} noOfLines={2}>
        {title}
      </Heading>
      <Text noOfLines={2}>{description}</Text>
      <Stack direction={['column', 'row']} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button colorScheme={'yellow'}>Watch Now</Button>
        </Link>
      </Stack>
    </VStack>
  );
};
const HomeStudentCard = ({ image, name, title, quote }) => {
  return (
    <VStack
      width={'350px'}
      boxShadow={'1px 3px 5px 1px #8185EA'}
      p="20px"
      borderRadius={'10px'}
      margin={'15px'}
    >
      <HStack>
        <Avatar name={name} src={image} size="20px" />
        <Heading fontSize={'20px'}>{title}</Heading>
      </HStack>
      <VStack alignItems={'left'} textAlign={'left'} spacing={'8px'}>
        <Text>{quote}</Text>
        <Text color={'yellow.500'} fontWeight="bold">
          {name}
        </Text>
      </VStack>
    </VStack>
  );
};
