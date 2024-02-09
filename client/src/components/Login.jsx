import React, { useState } from 'react';
import './css/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission logic, such as sending the data to the server
    console.log('Form submitted:', formData);
    // You can also reset the form fields after submission
    setFormData({
      username: '',
      email: '',
      password: '',
      password2: ''
    });
  };

  return (
    <div id="login-box">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Sign up</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password2"
            placeholder="Retype password"
            value={formData.password2}
            onChange={handleChange}
          />
          <input type="submit" name="signup_submit" value="Sign me up" />
        </div>
      </form>
      <div className="right">
        <span className="loginwith">Sign in with<br />social network</span>
        <button className="social-signin facebook">Log in with Facebook</button>
        <button className="social-signin twitter">Log in with Twitter</button>
        <button className="social-signin google">Log in with Google+</button>
      </div>
      <div className="or">OR</div>
    </div>
  );
};

export default Login;
