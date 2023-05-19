import { configureStore } from '@reduxjs/toolkit';
import {
  profileReducer,
  subscriptionReducer,
  userReducer,
} from './reducers/userReducer';
import { courseReducer } from '../redux/reducers/courseReducer';
import { adminReducer } from '../redux/reducers/adminReducer';
import { otherReducer } from '../redux/reducers/otherReducer';
import { noteReducer } from './reducers/noteReducer';
const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    courses: courseReducer,
    notes: noteReducer,
    subscription: subscriptionReducer,
    admin: adminReducer,
    other: otherReducer,
  },
});

export default store;
export const server = 'https://course-provider-app.onrender.com/api/v1';
// export const server = 'http://localhost:4000/api/v1';
