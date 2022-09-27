import { configureStore } from '@reduxjs/toolkit';
import {
  profileReducer,
  subscriptionReducer,
  userReducer,
} from './reducers/userReducer';
import { courseReducer } from '../redux/reducers/courseReducer';
import { adminReducer } from '../redux/reducers/adminReducer';
import { otherReducer } from '../redux/reducers/otherReducer';
const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    courses: courseReducer,
    subscription: subscriptionReducer,
    admin: adminReducer,
    other: otherReducer,
  },
});

export default store;
export const server = 'https://course-provider.herokuapp.com/api/v1';
