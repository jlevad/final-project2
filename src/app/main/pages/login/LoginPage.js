import {
  TextField,
  Button,
  Typography
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockRounded from '@mui/icons-material/LockRounded';

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center  md:mt-80">
      <div className="flex flex-col items-center justify-center p-4 rounded-md w-full md:w-1/2 shadow-md bg-blue-200">
        <div className="text-center flex items-center justify-center flex-col">
          <Typography
            variant="h4"
            className="w-full md:w-2/3"
          >
            Hello
          </Typography>
          <Typography
            variant="subtitle1"
            className="w-full md:w-2/3"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </div>
        <TextField
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
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
