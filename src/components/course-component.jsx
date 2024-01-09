import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCoursesById, deleteCourse } from '../services/course';

const CourseComponent = (props) => {
  const { currentUser } = props;
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);

  const fetchCourses = () => {
    let user_id;
    if (currentUser) {
      user_id = currentUser.user._id;

      fetchCoursesById(user_id)
        .then(({ data }) => {
          setCourseData(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleTakeToLogin = () => {
    navigate('/login');
  };

  const handleDeleteCourse = (id) => {
    deleteCourse(id)
      .then(() => {
        window.alert('課程已經成功刪除!');
        fetchCourses();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 首次進入頁面
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div style={{ padding: '3rem' }}>
      {!currentUser && (
        <div>
          <p>您必須先登入才能看到課程！</p>
          <button onClick={handleTakeToLogin} className="btn btn-primary btn-lg">
            回到登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === 'instructor' && (
        <div>
          <h1>歡迎來到講師的課程頁面。以下是您已經開設的課程！</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === 'student' && (
        <div>
          <h1>歡迎來到學生的課程頁面。以下是您已經報名的課程！</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length !== 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {courseData.map((course) => {
            return (
              <div key={course._id} className="card" style={{ width: '18rem', margin: '1rem' }}>
                <div className="card-body">
                  <h5 className="card-title">課程名稱: {course.title}</h5>
                  <p style={{ margin: '0.5rem 0rem' }} className="card-text">
                    {course.description}
                  </p>
                  <p style={{ margin: '0.5rem 0rem' }}>學生人數：{course.students.length}</p>
                  <p style={{ margin: '0.5rem 0rem' }}>課程價格：{course.price}</p>
                  {currentUser.user.role === 'instructor' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Link className="btn btn-primary" to={'../modifyCourse/' + course._id}>
                        修改
                      </Link>
                      <a className="btn btn-danger" onClick={() => handleDeleteCourse(course._id)}>
                        刪除
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
