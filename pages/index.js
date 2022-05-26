import { useState } from 'react';
import {
  Button,
  Input,
} from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { gitHubBaseURL } from '../public/general/index.js';

const Login = (props) => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    
    setUsername(value);
    setError('');
  };

  const handleClick = async () => {
    setDisabled(true);
    if (username) {
      await axios.get(`${gitHubBaseURL}/users/${username}`).then((res) => {
        const resData = res.data;
        const loginName = resData.login;
        const repoURL = resData.repos_url;
        localStorage.setItem('name', loginName);
        localStorage.setItem('repo', repoURL);
        setError('');
        router.push('/list');
      }). catch((err) => {
        setError(err.message);
        setDisabled(false);
      });
    } else {
      setError('Field cannot be empty');
      setDisabled(false);
    }
  };

  return (
    <div className='form-input'>
      <h1>Github Repos</h1>
      <Input name="username" value={username} disabled={disabled} size="large" placeholder="Input your github username here (ex: @johndoe)" onChange={handleChange}/>
      <div className='form-input__error'>{error}</div>
      <div className='form-input__button'>
        <Button type="primary" disabled={disabled} onClick={() => handleClick()}>See the List</Button>
      </div>
    </div>
  );
};

export default Login;