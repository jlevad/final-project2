import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Star from '@mui/icons-material/Star';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { useHistory } from 'react-router-dom';

// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const CardProducts = (props) => {
  const { index, item } = props;
  const history = useHistory();

  const handleClickProduct = (item) => {
    history.push({
      pathname: 'detail-product',
      state: item
    });
  }

  return (
    // key object
    // title, category, description, id, image, price, rating[count, rate],
    <Grid item xs={12} sm={4} md={3}>
      <div
        key={index}
        className="flex flex-col items-center  shadow-md rounded-md w-full h-full p-4 cursor-pointer"
        onClick={() => handleClickProduct(item)}
      >
        {item ? (
          <div
            style={{ width: 150, height: 150 }}
            className="flex items-center justify-center"
          >
            <img
              className="max-w-full max-h-full"
              alt={item?.title}
              src={item?.image}
            />
          </div>
        ) : (
          <Skeleton variant="rectangular" width={150} height={150} />
        )}

        {item ? (
          <div className="w-full mt-4">
            <Typography variant="subtitle1">
              {item?.title?.slice(0, 50)}...
            </Typography>
            <div className="flex items-center my-2">
              <AttachMoneyOutlinedIcon fontSize="small" color="success" />
              <Typography variant="body1">{item?.price}</Typography>
            </div>
            <div className="flex items-center">
              <Star fontSize="small" color="warning" />
              <Typography color="text.secondary">
                {item?.rating?.rate}
              </Typography>
            </div>
            {/* <div>
              <Button>Detail</Button>
              <Button>Add to Cart <AddShoppingCartIcon fontSize="small" /></Button>
            </div> */}
          </div>
        ) : (
          <div className="w-full mt-4">
            <Skeleton width="100%" />
            <Skeleton width="60%" />
            <Skeleton width="40%" />
          </div>
        )}
      </div>
    </Grid>
  );
};

export default CardProducts;
