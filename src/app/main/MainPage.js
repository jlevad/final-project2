import PropTypes from 'prop-types';
import { AppBar, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
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
import DetailProduct from './pages/detail-product/DetailProduct';
import Admin from './pages/admin/Admin';
import SalesReport from './pages/sales-report/SalesReport';

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
  const cart = useSelector((state) => state.cart.quantity);
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
            <div className="flex flex-row justify-between w-full">
              <LinkTabs link="/" label="Home" activeLink="text-blue-500" />
              {/* link admin sementara */}
              <LinkTabs
                link="/admin"
                label="Admin"
                activeLink="text-blue-500"
              />
              {user === null ? (
                <LinkTabs
                  link="/login"
                  label="Login"
                  activeLink="text-blue-500"
                />
              ) : (
                <div className="flex">
                  <div className="p-6 hover:text-blue-400 transition-all ease-in-out duration-300 cursor-pointer">
                    <NavLink exact to="/cart" activeClassName="text-blue-500">
                      <Badge badgeContent={cart} color="primary">
                        <ShoppingCartOutlinedIcon />
                      </Badge>
                    </NavLink>
                  </div>
                  <div className="p-6 hover:text-blue-400 transition-all ease-in-out duration-300">
                    <button
                      className="text-xl font-semibold"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
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
            <Route path="/product/:id" render={() => <DetailProduct />} />
            <Route
              path="/cart"
              render={() => (!user ? <Redirect to="/login" /> : <CartPage />)}
            />
            <Route path="/admin" render={() => <Admin />} />
            <Route path="/sales-report" render={() => <SalesReport />} />
          </div>
        </Switch>
      </Router>
    </div>
  );
};

export default MainPage;
