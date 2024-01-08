import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCourses, enrollCourse } from '../services/course';

const EnrollComponent = (props) => {
  const { currentUser } = props;
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const navigate = useNavigate();

  const getCourse = async () => {
    try {
      let response = await fetchCourses();
      setSearchResult(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  // 進入頁面先顯示全部的課程
  useEffect(() => {
    getCourse();
  }, []);

  const handleTakeToLogin = () => {
    navigate('/login');
  };

  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  // 如果有搜尋內容，就顯示搜尋結果；如果沒有搜尋內容，就顯示全部課程
  const handleSearch = async () => {
    try {
      let { data } = await fetchCourses();
      let getValue = new RegExp(searchInput, 'gi');
      let courseFound = [...data].filter((course) => {
        return getValue.exec(course.title);
      });
      setSearchResult(courseFound);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEnroll = (e) => {
    enrollCourse(e.target.id)
      .then(() => {
        window.alert('課程報名成功！重新導向到課程頁面。');
        navigate('/course');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={{ padding: '3rem' }}>
      {!currentUser && (
        <div>
          <p>您必須先登入才能開始註冊課程！</p>
          <button onClick={handleTakeToLogin} className="btn btn-primary btn-lg">
            回到登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === 'instructor' && (
        <div>
          <h1>只有學生才能夠註冊課程！</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === 'student' && (
        <div className="search input-group mb-3">
          <input type="search" className="form-control" onChange={handleChangeInput} />
          <button className="btn btn-primary" onClick={handleSearch}>
            搜尋課程
          </button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length !== 0 && (
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {searchResult.map((course) => {
              return (
                <div key={course._id} className="card" style={{ width: '18rem', margin: '1rem' }}>
                  <div className="card-body">
                    <h5 className="card-title">課程名稱: {course.title}</h5>
                    <p style={{ margin: '0.5rem 0rem' }} className="card-text">
                      {course.description}
                    </p>
                    <p style={{ margin: '0.5rem 0rem' }}>學生人數：{course.students.length}</p>
                    <p style={{ margin: '0.5rem 0rem' }}>課程價格：{course.price}</p>
                    <p style={{ margin: '0.5rem 0rem' }}>講師：{course.instructor.username}</p>
                    <a href="#" id={course._id} className="card-text btn btn-primary" onClick={handleEnroll}>
                      報名課程
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
