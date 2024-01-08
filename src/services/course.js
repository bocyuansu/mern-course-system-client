import axios from 'axios';

const API_URL = 'http://localhost:8080/api/courses';

const courseRequest = axios.create({
  baseURL: API_URL,
});

export const newCourse = (data) => {
  let token = '';

  if (localStorage.getItem('user')) {
    token = JSON.parse(localStorage.getItem('user')).token;
  }

  let config = {
    headers: {
      Authorization: token,
    },
  };

  return courseRequest.post('/', data, config);
};

// 使用學生id，找到學生註冊的課程
// 使用講師id，找到講師擁有的課程
export const fetchCoursesById = (id) => {
  let token = '';
  let role = '';

  if (localStorage.getItem('user')) {
    token = JSON.parse(localStorage.getItem('user')).token;
    role = JSON.parse(localStorage.getItem('user')).user.role;
  }

  let config = {
    headers: {
      Authorization: token,
    },
  };

  return courseRequest.get(`/${role}/${id}`, config);
};

// 取得所有課程
export const fetchCourses = () => {
  let token = '';

  if (localStorage.getItem('user')) {
    token = JSON.parse(localStorage.getItem('user')).token;
  }

  let config = {
    headers: {
      Authorization: token,
    },
  };

  return courseRequest.get('/', config);
};

// 註冊課程
export const enrollCourse = (id) => {
  let token = '';

  if (localStorage.getItem('user')) {
    token = JSON.parse(localStorage.getItem('user')).token;
  }

  let config = {
    headers: {
      Authorization: token,
    },
  };

  return courseRequest.post('/enroll/' + id, {}, config);
};
