import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Button, Typography } from '@mui/material';
import Star from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../../redux/cartRedux';

const DetailProduct = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === 'inc') {
      setQuantity(quantity + 1);
    } else {
      quantity > 1 && setQuantity(quantity - 1);
    }
  };

  const addCart = () => {
    dispatch(
      addProduct({
        ...product,
        quantity,
      })
    );
  };

  const needLogin = () => {
    history.push('/login');
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    marginTop: '24px',
    padding: '12px 18px',
    color: 'white',
    border: 'none',
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: '#222222',
      border: 'none',
    },
  }));

  return (
    <div id="detail-product" className="">
      <div className="wrapper-inner flex flex-wrap gap-6">
        <div
          className="img-wrapper flex-1 grid place-items-center"
          style={{ minWidth: '300px' }}
        >
          <img
            src={product?.image}
            alt={product?.title}
            style={{ height: '450px' }}
          />
        </div>
        <div className="info flex-1 pr-16" style={{ minWidth: '500px' }}>
          <Typography variant="h3">{product?.title}</Typography>
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
          <div className="count flex mt-5 gap-2 items-center">
            <button
              className="px-2 grid place-content-center h-6 border border-black rounded cursor-pointer hover:bg-black duration-300 transition-all hover:text-white"
              onClick={() => handleQuantity('dec')}
            >
              -
            </button>
            <span className="text-2xl leading-normal px-2">{quantity}</span>
            <button
              className="px-2 grid place-content-center h-6 border border-black rounded cursor-pointer hover:bg-black duration-300 transition-all hover:text-white"
              onClick={() => handleQuantity('inc')}
            >
              +
            </button>
          </div>
          <ColorButton
            variant="outlined"
            mt={4}
            onClick={user ? addCart : needLogin}
          >
            Add to cart
          </ColorButton>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
