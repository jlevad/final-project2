/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';
import CardProducts from '../../shared-component/CardProduct';
import { useDispatch, useSelector } from 'react-redux';
import {
  productFail,
  productStart,
  productSuccess,
} from '../../../redux/productRedux';

const HomePage = (props) => {
  // const [datas, setDatas] = useState([]);
  // const [loading, setLoading] = useState(true);
  const product = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const history = useHistory();

  const getData = () => {
    product(productStart());
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        // console.log(res.data);
        product(productSuccess(res.data));
        // setDatas(res.data);
        // setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        product(productFail([]));
        // setDatas([]);
        // setLoading(false);
      });
  };

  useEffect(() => {
    if (products.length === 0) {
      getData();
    }
  }, []);

  useEffect(() => {
    props.setHistory(history);
  }, [history]);

  return (
    // key object
    // title, category, description, id, image, price, rating[count, rate],
    <Grid container spacing={4}>
      {loading ? (
        Array.from(new Array(6)).map((item, index) => (
          <CardProducts
            loading={loading}
            item={item}
            index={index}
            key={index}
          />
        ))
      ) : products.length !== 0 ? (
        products.map((item, index) => (
          <CardProducts
            loading={loading}
            item={item}
            index={index}
            key={index}
          />
        ))
      ) : (
        <div className="w-full mt-6">
          <Typography align="center" variant="body1">
            Halaman Gagal Dimuat
          </Typography>
        </div>
      )}
    </Grid>
  );
};

export default HomePage;
