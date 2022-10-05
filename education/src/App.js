import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
import Courses from './components/Courses/Courses';
import Footer from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import Subscribe from './components/Payments/Subscribe';
import NotFound from './components/NotFound/NotFound';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import PaymentFail from './components/Payments/PaymentFail';
import CoursePage from './components/CourseDetail/CoursePage';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import Users from './components/Admin/Users/Users';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';
import AdminCourses from './components/Admin/Courses/AdminCourses';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { getMyProfile } from './redux/actions/user';
import { ProtectedRoute } from 'protected-route-react';
import Loader from './components/Layout/Loader/Loader';
import Sidebar from './components/Layout/Sidebar/Sidebar';
import Notes from './components/Notes/Notes';
import NotePage from './components/NoteDetail/NotePage';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, message, error, loading } = useSelector(
    state => state.user
  );
  window.addEventListener('contextmenu', e => {
    e.preventDefault();
  });
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);
  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header isAuthenticated={isAuthenticated} user={user} />
          <Routes>
            <Route exact path="/" element={<Home />} />
          
            <Route exact path="/courses" element={<Courses />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/notes" element={<Notes />} />
            <Route
              exact
              path="/login"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route exact path="/about" element={<About />} />
            <Route
              exact
              path="/register"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route exact path="/request" element={<Request />} />
            <Route
              exact
              path="/forgotpassword"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <ForgetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/resetpassword/:token"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <ResetPassword />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/subscribe"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Subscribe user={user} />
                </ProtectedRoute>
              }
            />
            <Route exact path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route exact path="/paymentfail" element={<PaymentFail />} />
            <Route
              exact
              path="/course/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CoursePage user={user}/>
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/note/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <NotePage user={user}/>
                </ProtectedRoute>
              }
            />
            <Route exact path="*" element={<NotFound />} />

            <Route
              exact
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/changepassword"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/updateprofile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UpdateProfile user={user} />
                </ProtectedRoute>
              }
            />

            {/* ADMIN Routes */}
            <Route
              exact
              path="/admin/dashboard"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === 'admin'}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/admin/createcourse"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === 'admin'}
                >
                  <CreateCourse />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/admin/users"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === 'admin'}
                >
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/admin/courses"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === 'admin'}
                >
                  <AdminCourses />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <Toaster />
        </>
      )}
    </Router>
  );
}

export default App;
