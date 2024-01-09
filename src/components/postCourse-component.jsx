import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { newCourse } from '../services/course';

const PostCourseComponent = (props) => {
  const { currentUser } = props;
  const [course, setCourse] = useState({
    title: '',
    description: '',
    price: 0,
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleTakeToLogin = () => {
    navigate('/login');
  };

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const postCourse = () => {
    newCourse(course)
      .then(() => {
        window.alert('新課程已創建成功');
        navigate('/course');
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: '3rem' }}>
      {!currentUser && (
        <div>
          <p>在發布新課程之前，您必須先登入。</p>
          <button className="btn btn-primary btn-lg" onClick={handleTakeToLogin}>
            進入登入頁面。
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role !== 'instructor' && (
        <div>
          <p>只有講師可以發布新課程。</p>
        </div>
      )}
      {currentUser && currentUser.user.role == 'instructor' && (
        <div className="form-group">
          <label htmlFor="title">課程標題：</label>
          <input name="title" type="text" className="form-control" id="title" onChange={handleChange} />
          <br />
          <label htmlFor="description">內容：</label>
          <textarea name="description" className="form-control" id="description" aria-describedby="emailHelp" onChange={handleChange} />
          <br />
          <label htmlFor="price">價格：</label>
          <input name="price" type="number" className="form-control" id="price" onChange={handleChange} />
          <br />
          <button className="btn btn-primary" onClick={postCourse}>
            交出表單
          </button>
          <br />
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCourseComponent;
