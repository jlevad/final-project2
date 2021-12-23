import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import Star from '@mui/icons-material/Star';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../../../redux/cartRedux';

const DetailProduct = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setProduct(location.state);
  }, [location]);

  const handleQuantity = (type) => {
    if (type === 'inc') {
      setQuantity(quantity + 1);
    } else {
      quantity > 0 && setQuantity(quantity - 1);
    }
  };

  const addCart = (item) => {
    let a = cart?.products.filter((data) => data?.id === item?.id);
    if (a.length === 0) {
      dispatch(
        addProduct({ ...product, quantity })
      );
    } else {
      dispatch(
        updateProduct({ ...product, quantity: a[0].quantity + quantity })
      );
    }
  };

  const needLogin = () => {
    history.push('/login');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <div className="h-full flex justify-center items-center">
          <img
            src={product?.image}
            alt={product?.title}
            // className='max-w-full max-h-full'
            style={{ width: '200px' }}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h3">
          {product?.title}
        </Typography>
        <div className="flex items-center gap-2 my-3">
          <Star fontSize="small" color="warning" />
          <Typography color="text.secondary">
            {product?.rating?.rate}
          </Typography>
        </div>
        <hr className="mb-3" />
        <Typography variant="h5">${product?.price}</Typography>
        <Typography variant="body1" mt={2}>
          {product?.description}
        </Typography>
        <div className="flex items-center mt-4 gap-2">
          <span className="inline-block text-xs">Categories</span>
          <Typography
            variant="body1"
            className="bg-gray-200 py-1 px-3 w-max rounded-md text-gray-500"
          >
            {product?.category}
          </Typography>
        </div>
        {user?.email ? '' :
          <>
            <div className="count flex mt-5 items-center">
              <IconButton
                aria-label='min-button'
                size="large"
                onClick={() => handleQuantity('dec')}
              >
                <IndeterminateCheckBoxOutlinedIcon fontSize="large" />
              </IconButton>
              <span className="text-2xl leading-normal">{quantity}</span>
              <IconButton
                aria-label='min-button'
                size="large"
                disabled={quantity === product?.stock}
                onClick={() => handleQuantity('inc')}
              >
                <AddBoxOutlinedIcon fontSize="large" />
              </IconButton>
              {quantity === product?.stock ?
                <div>
                  <Typography color="red">
                    Max Quantity
                  </Typography>
                </div> : ''
              }
            </div>
            <Button
              variant="contained"
              onClick={() => {
                user ? addCart(product) : needLogin();
              }}
              disabled={quantity < 1}
            >
              Add to cart
            </Button>
          </>
        }
      </Grid>
    </Grid>
  );
};

export default DetailProduct;
