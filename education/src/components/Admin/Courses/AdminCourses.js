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
import CourseModel from './CourseModel';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCourses,
  getCourseLectures,
} from '../../../redux/actions/course';
import {
  addLecture,
  deleteCourse,
  deleteLecture,
} from '../../../redux/actions/admin';
const AdminCourses = () => {
  const [courseIdss, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { courses, lectures } = useSelector(state => state.courses);
  const { loading, error, message } = useSelector(state => state.admin);
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

  const courseDetailsHandler = (id, title) => {
    dispatch(getCourseLectures(id));
    onOpen();
    setCourseId(id);
    setCourseTitle(title);
  };
  const deleteCourseHandler = id => {
    dispatch(deleteCourse(id));
  };
  const deleteHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
    dispatch(getCourseLectures(courseId));
  };
  const addLectureHandler = async (e, courseid, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);
    await dispatch(addLecture(courseid, myForm));
    dispatch(getCourseLectures(courseid));
  };

  return (
    <Grid minH="100vh" templateColumns={['1fr', '5fr 1fr']}>
      <Box p={['0', '8']} overflow="auto">
        <Heading
          textTransform={'uppercase'}
          my="16"
          textAlign={['center', 'left']}
        >
          All Users
        </Heading>
        <TableContainer w={['100vw', 'full']}>
          <Table variant="simple" size="lg">
            <TableCaption>All available Courses in the Database</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map(item => (
                <Row
                  item={item}
                  key={item._id}
                  courseDetailsHandler={courseDetailsHandler}
                  deleteCourseHandler={deleteCourseHandler}
                  loading={loading}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModel
          isOpen={isOpen}
          onClose={onClose}
          id={courseIdss}
          deleteHandler={deleteHandler}
          addLectureHandler={addLectureHandler}
          courseTitle={courseTitle}
          lectures={lectures}
          loading={loading}
        />
      </Box>

      <Sidebar />
    </Grid>
  );
};

export default AdminCourses;

function Row({ item, courseDetailsHandler, loading, deleteCourseHandler }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>
      <Td isNumeric>
        <HStack justifyContent="flex-end">
          <Button
            variant="outline"
            color="puprle.500"
            onClick={() => courseDetailsHandler(item._id, item.title)}
            isLoading={loading}
          >
            View Lectures
          </Button>
          <Button
            isLoading={loading}
            color="puprle.600"
            onClick={() => deleteCourseHandler(item._id)}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
