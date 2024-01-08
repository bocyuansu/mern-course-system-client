import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/home-component';
import Register from './components/register-component';
import Login from './components/login-component';
import Profile from './components/profile-component';
import Course from './components/course-component';
import PostCourse from './components/postCourse-component';
import EnrollComponent from './components/enroll-component';
import { getCurrentUser } from './services/auth';

function App() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="profile" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="course" element={<Course currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="postCourse" element={<PostCourse currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="enroll" element={<EnrollComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
