import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

const LoginComponent = (props) => {
  const { setCurrentUser } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      let response = await login({ email, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      window.alert('登入成功。您現在將被重新導向到個人頁面！');
      setCurrentUser(response.data);
      navigate('/profile');
    } catch (e) {
      setMessage(e.response.data);
    }
  };

  return (
    <div style={{ padding: '3rem' }} className="col-md-12">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <div className="form-group">
          <label htmlFor="username">電子信箱：</label>
          <input onChange={handleEmail} type="text" className="form-control" name="email" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼：</label>
          <input onChange={handlePassword} type="password" className="form-control" name="password" />
        </div>
        <br />
        <div className="form-group">
          <button onClick={handleLogin} className="btn btn-primary btn-block">
            <span>登入系統</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
