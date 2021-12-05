import PropTypes from 'prop-types';
import { AppBar, Typography } from '@mui/material';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  NavLink,
  Redirect,
} from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import CartPage from './pages/cart/CartPage';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userRedux';
import { useEffect } from 'react';

const LinkTabs = (props) => {
  const { link, label, activeLink } = props;
  return (
    <div className="p-6 hover:text-blue-400 transition-all ease-in-out duration-300">
      <NavLink exact to={link} activeClassName={activeLink}>
        <Typography variant="h6">{label}</Typography>
      </NavLink>
    </div>
  );
};

LinkTabs.propTypes = {
  link: PropTypes.string.isRequired,
  activeLink: PropTypes.string,
  label: PropTypes.string.isRequired,
};

const MainPage = () => {
  // user login
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  // logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex-grow w-full">
      <Router>
        <AppBar position="fixed" color="default">
          <div className="container-navbar flex justify-between items-center">
            <div className="flex flex-row">
              <LinkTabs link="/" label="home" activeLink="text-blue-500" />
              {user === null ? (
                <LinkTabs
                  link="/login"
                  label="Login"
                  activeLink="text-blue-500"
                />
              ) : (
                <>
                  <div className="p-6 hover:text-blue-400 transition-all ease-in-out duration-300">
                    <button
                      className="text-xl font-semibold"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                  <LinkTabs
                    link="/cart"
                    label="Cart"
                    activeLink="text-blue-500"
                  />
                </>
              )}
            </div>
          </div>
        </AppBar>
        <Switch>
          <div className="my-28 mx-6">
            <Route exact path="/" render={() => <HomePage />} />
            <Route
              path="/login"
              render={() => (user ? <Redirect to="/" /> : <LoginPage />)}
            />
            <Route
              path="/cart"
              render={() => (!user ? <Redirect to="/login" /> : <CartPage />)}
            />
          </div>
        </Switch>
      </Router>
    </div>
  );
};

export default MainPage;
