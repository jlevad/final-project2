import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddMinBtn from '../../shared-component/AddMinBtn';
import { useDispatch } from 'react-redux';
import { removeCart, removeProduct, updateProduct, checkOut } from '../../../redux/cartRedux';
import { productCheckout } from '../../../redux/productRedux';

const CartItem = ({ data }) => {
  const dispatch = useDispatch();
  const handleDel = () => {
    dispatch(removeProduct({ ...data }));
  };

  const handleQuantity = (type) => {
    if (type === 'inc') {
      dispatch(updateProduct({
        ...data,
        quantity: data.quantity + 1,
      }));
    } else {
      data.quantity > 1 && dispatch(updateProduct({
        ...data,
        quantity: data.quantity - 1,
      }));
    }
  };

  return (
    <div id="cart-item" className="h-36 flex justify-between mb-6 w-full">
      <div className="content-cart h-full flex gap-8">
        <div
          className="img-wrapper h-full grid place-items-center"
          style={{ width: '130px' }}
        >
          <img src={data.image} alt={data.title} className="h-8/12 w-8/12" />
        </div>
        <div className="desc-item-cart flex flex-col justify-between pb-4">
          <div className="top">
            <Typography variant="h5">{data?.title?.slice(0, 40)}..</Typography>
            <Typography variant="body1" mt={1}>
              Price: ${data.price}
            </Typography>
          </div>
          <button className="w-max" onClick={handleDel}>
            <DeleteOutlineOutlinedIcon className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      </div>
      <div className="add-item">
        <AddMinBtn
          value={data.quantity}
          minBtn={() => handleQuantity('dec')}
          addBtn={() => handleQuantity('inc')}
        />
      </div>
    </div>
  );
};

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const handleCheckout = (cart) => {
    // const inibaru = cart.products.map(item => item.id)
    if (cart.products.length !== 0) {
      cart.products.map((data) => {
        return dispatch(checkOut({
          ...data
        }));
      })
    }
    dispatch(productCheckout(cart));
    dispatch(removeCart());
  }

  return (
    <div id="cart">
      <Typography variant="h4" mb={6}>
        Shopping Cart
      </Typography>
      <div className="container-item flex flex-wrap gap-8 justify-between">
        <div className="item-cart-container" style={{ flex: '3' }}>
          {cart.products.length !== 0 ? (
            cart?.products.map((item, i) => <CartItem data={item} key={i} />)
          ) : (
            <Typography variant="h4">No items</Typography>
          )}
        </div>
        <div className="summary flex-1">
          <div className="wrap-inner border border-gray-300 rounded-xl p-6">
            <Typography variant="h5">Your order summary</Typography>
            <div className="total-product flex justify-between mt-7">
              <Typography variant="string">Total Product</Typography>
              <Typography variant="string">{cart.totalQuantity}</Typography>
            </div>
            <div className="total-product flex justify-between mt-3">
              <Typography variant="string">Total Price</Typography>
              <Typography variant="string">
                ${cart.totalPrice.toFixed(2)}
              </Typography>
            </div>
          </div>
          <button
            className="mt-4 bg-black w-full py-2 text-white rounded-lg hover:opacity-80"
            onClick={() => handleCheckout(cart)}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
