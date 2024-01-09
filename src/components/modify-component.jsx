import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOneCourseById, modifyCourse } from '../services/course';

const ModifyComponent = (props) => {
  // 取得課程 id
  const { id } = useParams();
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

  const patchCourse = () => {
    modifyCourse(id, course)
      .then(() => {
        window.alert('課程修改成功。您現在將被重新導向到課程頁面！');
        navigate('/course');
      })
      .catch((e) => {
        console.log(e);
        setMessage(e);
      });
  };

  useEffect(() => {
    fetchOneCourseById(id)
      .then(({ data }) => {
        const newData = { title: data.title, description: data.description, price: data.price };
        setCourse(newData);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div style={{ padding: '3rem' }}>
      {!currentUser && (
        <div>
          <p>在修改課程之前，您必須先登入。</p>
          <button className="btn btn-primary btn-lg" onClick={handleTakeToLogin}>
            進入登入頁面。
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role !== 'instructor' && (
        <div>
          <p>只有講師可以修改課程。</p>
        </div>
      )}
      {currentUser && currentUser.user.role == 'instructor' && (
        <div className="form-group">
          <label htmlFor="title">課程標題：</label>
          <input name="title" type="text" className="form-control" id="title" value={course.title} onChange={handleChange} />
          <br />
          <label htmlFor="description">內容：</label>
          <textarea name="description" className="form-control" id="description" aria-describedby="emailHelp" value={course.description} onChange={handleChange} />
          <br />
          <label htmlFor="price">價格：</label>
          <input name="price" type="number" className="form-control" id="price" value={course.price} onChange={handleChange} />
          <br />
          <button className="btn btn-primary" onClick={patchCourse}>
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

export default ModifyComponent;
