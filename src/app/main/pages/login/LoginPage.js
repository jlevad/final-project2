import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockRounded from '@mui/icons-material/LockRounded';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from '../../../redux/userRedux';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const history = useHistory();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async () => {
    dispatch(loginStart());
    if (
      username === process.env.REACT_APP_USERNAME &&
      password === process.env.REACT_APP_PASSWORD
    ) {
      const res = await axios.post('https://fakestoreapi.com/auth/login', {
        username: username,
        password: password,
      });
      dispatch(loginSuccess(res.data.token));
      history.push('/');
    } else {
      dispatch(loginFailure());
    }
  };

  return (
    <div className="flex justify-center items-center  md:mt-80">
      <div className="flex flex-col items-center justify-center p-4 rounded-md w-full md:w-1/2 shadow-md bg-blue-200">
        <div className="text-center flex items-center justify-center flex-col">
          <Typography variant="h4" className="w-full md:w-2/3">
            Hello
          </Typography>
          <Typography variant="subtitle1" className="w-full md:w-2/3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </div>
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          label="username"
          // variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          margin="normal"
          className="bg-white w-full md:w-2/3"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          label="Password"
          type="password"
          // variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockRounded />
              </InputAdornment>
            ),
          }}
          margin="normal"
          className="bg-white w-full md:w-2/3"
        />
        <div className="my-6 w-full md:w-2/3">
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            disabled={loading ? true : false}
          >
            {loading ? 'Loading...' : 'LOGIN'}
          </Button>
        </div>
        {error && (
          <p className="text-center text-red-500">Wrong username or password</p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
