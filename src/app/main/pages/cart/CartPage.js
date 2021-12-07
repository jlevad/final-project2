import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddMinBtn from '../../shared-component/AddMinBtn';

const CartItem = ({ data }) => {
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
            <Typography variant="h5">{data.title.slice(0, 16)}</Typography>
            <Typography variant="body1" mt={1}>
              Price: ${data.price}
            </Typography>
          </div>
          <button className="w-max">
            <DeleteOutlineOutlinedIcon className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      </div>
      <div className="add-item">
        <AddMinBtn value={data.quantity} />
      </div>
    </div>
  );
};

const CartPage = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div id="cart">
      <Typography variant="h4" mb={6}>
        Shopping Cart
      </Typography>
      <div className="container-item flex flex-wrap gap-8 justify-between">
        <div className="item-cart-container" style={{ flex: '3' }}>
          {cart.products.length !== 0 ? (
            cart.products.map((item, i) => <CartItem data={item} key={i} />)
          ) : (
            <Typography variant="h4">No items</Typography>
          )}
        </div>
        <div className="summary flex-1">
          <div className="wrap-inner border border-gray-300 rounded-xl p-6">
            <Typography variant="h5">Your order summary</Typography>
            <div className="total-product flex justify-between mt-7">
              <Typography variant="string">Total Product</Typography>
              <Typography variant="string">{cart.quantity}</Typography>
            </div>
            <div className="total-product flex justify-between mt-3">
              <Typography variant="string">Total Price</Typography>
              <Typography variant="string">${cart.totalPrice}</Typography>
            </div>
          </div>
          <button className="mt-4 bg-black w-full py-2 text-white rounded-lg hover:opacity-80">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
