import { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';

interface LoginResponse {
  accessToken: string;
}

export const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post<LoginResponse>('http://localhost:8080/api/auth/login', {
        usernameOrEmail,
        password,
      });
      localStorage.setItem('token', response.data.accessToken);
      onLogin();
    } catch (err) {
      setError('Pogrešan username ili password');
    }
  };

  return (
    <div>
      <Typography variant="h6">Prijava</Typography>
      <TextField label="Korisničko ime ili email" fullWidth margin="dense"
                 value={usernameOrEmail} onChange={e => setUsernameOrEmail(e.target.value)} />
      <TextField label="Lozinka" fullWidth margin="dense" type="password"
                 value={password} onChange={e => setPassword(e.target.value)} />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" onClick={handleLogin}>Prijavi se</Button>
    </div>
  );
};