import axios from 'axios';

const API_URL = 'https://breakable-duck-kilt.cyclic.app/api/courses';

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

// 使用學生id，找到學生註冊的所有課程
// 使用講師id，找到講師擁有的所有課程
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

// 取得學生能註冊的所有課程
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

// 使用課程id 尋找單一的課程
export const fetchOneCourseById = (CourseId) => {
  let token = '';

  if (localStorage.getItem('user')) {
    token = JSON.parse(localStorage.getItem('user')).token;
  }

  let config = {
    headers: {
      Authorization: token,
    },
  };

  return courseRequest.get('/' + CourseId, config);
};

// 使用課程id 修改單一的課程
export const modifyCourse = (CourseId, data) => {
  let token = '';

  if (localStorage.getItem('user')) {
    token = JSON.parse(localStorage.getItem('user')).token;
  }

  let config = {
    headers: {
      Authorization: token,
    },
  };

  return courseRequest.patch('/' + CourseId, data, config);
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

// 用 課程id 刪除課程
export const deleteCourse = (id) => {
  let token = '';

  if (localStorage.getItem('user')) {
    token = JSON.parse(localStorage.getItem('user')).token;
  }

  let config = {
    headers: {
      Authorization: token,
    },
  };

  return courseRequest.delete('/' + id, config);
};
