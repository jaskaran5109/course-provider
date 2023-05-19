import { server } from '../store';
import axios from 'axios';

export const createCourse = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    dispatch({ type: 'createCourseRequest' });

    const { data } = await axios.post(
      `${server}/create/course`,
      formData,
      config
    );

    dispatch({ type: 'createCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'createCourseFail',
      payload: error.response.data.message,
    });
  }
};
export const createNote = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    dispatch({ type: 'createNoteRequest' });

    const { data } = await axios.post(
      `${server}/create/note`,
      formData,
      config
    );

    dispatch({ type: 'createNoteSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'createNoteFail',
      payload: error.response.data.message,
    });
  }
};
export const deleteCourse = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteCourseRequest' });

    const { data } = await axios.delete(`${server}/course/${id}`, config);

    dispatch({ type: 'deleteCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteCourseFail',
      payload: error.response.data.message,
    });
  }
};
export const deleteNote = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteNoteRequest' });

    const { data } = await axios.delete(`${server}/note/${id}`, config);

    dispatch({ type: 'deleteNoteSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteNoteFail',
      payload: error.response.data.message,
    });
  }
};
export const addLecture = (id, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    dispatch({ type: 'addLectureRequest' });
    const { data } = await axios.post(
      `${server}/course/${id}`,
      formData,
      config
    );

    dispatch({ type: 'addLectureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'addLectureFail',
      payload: error.response.data.message,
    });
  }
};

export const addNoteNote = (id, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    dispatch({ type: 'addNoteNoteRequest' });
    const { data } = await axios.post(
      `${server}/note/${id}`,
      formData,
      config
    );

    dispatch({ type: 'addNoteNoteSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'addNoteNoteFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteLecture = (courseId, lectureId) => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteLectureRequest' });
    const { data } = await axios.delete(
      `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
      config
    );

    dispatch({ type: 'deleteLectureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteLectureFail',
      payload: error.response.data.message,
    });
  }
};
export const deleteNoteNote = (noteId, notesId) => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteNoteNoteRequest' });
    const { data } = await axios.delete(
      `${server}/delnotes?noteId=${noteId}&notesId=${notesId}`,
      config
    );

    dispatch({ type: 'deleteNoteNoteSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteNoteNoteFail',
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'getAllUsersRequest' });
    const { data } = await axios.get(`${server}/admin/getallusers`, config);

    dispatch({ type: 'getAllUsersSuccess', payload: data.users });
  } catch (error) {
    dispatch({
      type: 'getAllUsersFail',
      payload: error.response.data.message,
    });
  }
};

export const updateUserRole = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'updateUserRoleRequest' });
    const { data } = await axios.put(`${server}/admin/user/${id}`, {}, config);

    dispatch({ type: 'updateUserRoleSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateUserRoleFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteUserRequest' });
    const { data } = await axios.delete(`${server}/admin/user/${id}`, config);

    dispatch({ type: 'deleteUserSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteUserFail',
      payload: error.response.data.message,
    });
  }
};
export const getDashboardStats = () => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'getAdminStatsRequest' });

    const { data } = await axios.get(`${server}/admin/stats`, config);

    dispatch({ type: 'getAdminStatsSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getAdminStatsFail',
      payload: error.response.data.message,
    });
  }
};