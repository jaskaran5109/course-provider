import { createReducer } from '@reduxjs/toolkit';

export const noteReducer = createReducer(
  { notes: [], notesnote: [] },
  {
    allNotesRequest: state => {
      state.loading = true;
    },
    allNotesSuccess: (state, action) => {
      state.loading = false;
      state.notes = action.payload;
    },
    allNotesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
    getNoteRequest: state => {
      state.loading = true;
    },
    getNoteSuccess: (state, action) => {
      state.loading = false;
      state.notesnote = action.payload;
    },
    getNoteFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
);
