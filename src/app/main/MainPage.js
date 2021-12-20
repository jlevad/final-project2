import PropTypes from 'prop-types';
import { AppBar, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector, useDispatch } from 'react-redux';
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
import { logout } from '../redux/userRedux';
import DetailProduct from './pages/detail-product/DetailProduct';

import Admin from './pages/admin/Admin';
import SalesReportPage from './pages/sales-report/SalesReport';
// import imageLogo from '../assets/logo512.png';
import { useState } from 'react';

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
  const [history, setHistory] = useState(null);

  const cart = useSelector((state) => state.cart.quantity);

  // user login
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  // logout
  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <div className=" w-full">
      <Router>
        <AppBar position="fixed" color="default">
          <div className="container-navbar flex justify-between items-center">
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-row">
                {/* <div className="flex justify-center items-center ml-4">
                  <img src={imageLogo} className="rounded-full max-h-16" />
                </div> */}
                <LinkTabs link="/" label="Bukapedia" activeLink="" />
                <LinkTabs link="/" label="Home" activeLink="text-blue-500" />
                {user?.email === 'admin@bukapedia.com' ? (
                  <>
                    <LinkTabs link="/admin" label="Admin" activeLink="text-blue-500" />
                    <LinkTabs link="/sales-report" label="Sales Report" activeLink="text-blue-500" />
                  </>
                ) : null}
              </div>
              {user === null ? (
                <LinkTabs link="/login" label="Login" activeLink="text-blue-500" />
              ) : (
                <div className="flex">
                  {user?.email === 'admin@bukapedia.com' ? (
                    <div className="p-6 hover:text-blue-400 transition-all ease-in-out duration-300">
                      <button className="text-xl font-semibold" onClick={handleLogout} >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="p-6 hover:text-blue-400 transition-all ease-in-out duration-300 cursor-pointer">
                        <NavLink exact to="/cart" activeClassName="text-blue-500" >
                          <Badge badgeContent={cart} color="primary">
                            <ShoppingCartOutlinedIcon />
                          </Badge>
                        </NavLink>
                      </div>
                      <div className="p-6 hover:text-blue-400 transition-all ease-in-out duration-300">
                        <button className="text-xl font-semibold" onClick={handleLogout} >
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </AppBar>
        <Switch>
          <div className="my-28 mx-2 md:mx-6">
            <Route exact path="/"
              render={() => <HomePage setHistory={setHistory} />}
            />
            <Route path="/login"
              render={() => (user ? <Redirect to="/" /> : <LoginPage />)}
            />

            <Route path="/detail-product" render={() => <DetailProduct />} />
            <Route path="/sales-report" render={() => <SalesReportPage />} />
            <Route path="/cart"
              render={() => (!user ? <Redirect to="/login" /> : <CartPage />)}
            />
            <Route path="/admin" render={() => <Admin />} />
          </div>
        </Switch>
      </Router>
    </div>
  );
};

export default MainPage;
