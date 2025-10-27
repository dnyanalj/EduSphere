import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const nav = useNavigate();

  async function submit(e){ e.preventDefault();
    const { data } = await API.post('/auth/login',{ username, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.user.role);
    nav(data.user.role === 'EXAMINER' ? '/examiner' : '/candidate');
  }

  return (
    <form onSubmit={submit}>
      <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="username"/>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password"/>
      <button>Login</button>
    </form>
  );
}
