import { useState } from 'react';
import {
  Button,
  Input,
} from 'antd';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    
    setUsername(value);
    setError("");
  };

  const handleClick = () => {
    if (username) {
      console.log('click');
    } else {
      setError("Field cannot be empty");
    }
  };

  return (
    <div className='form-input'>
      <h1>Github Repo List</h1>
      <Input name="username" value={username} size="large" placeholder="Input your github username here (ex: @johndoe)" onChange={handleChange}/>
      <div className='form-input__error'>{error}</div>
      <div className='form-input__button'>
        <Button type="primary" onClick={() => handleClick()}>See the List</Button>
      </div>
    </div>
  );
};

export default Login;