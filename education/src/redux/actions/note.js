import { server } from '../store';
import axios from 'axios';

export const getAllNotes = () => async dispatch => {
  try {
    dispatch({ type: 'allNotesRequest' });

    const { data } = await axios.get(`${server}/notes`);

    dispatch({ type: 'allNotesSuccess', payload: data.notes });
  } catch (error) {
    dispatch({
      type: 'allNotesFail',
      payload: error.response.data.message,
    });
  }
};

export const getNoteNotes = id => async dispatch => {
  try {
    dispatch({ type: 'getNoteRequest' });

    const { data } = await axios.get(`${server}/note/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: 'getNoteSuccess', payload: data.notes });
  } catch (error) {
    dispatch({
      type: 'getNoteFail',
      payload: error.response.data.message,
    });
  }
};
