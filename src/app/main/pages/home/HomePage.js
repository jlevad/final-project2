import axios from 'axios';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';
import CardProducts from '../../shared-component/CardProduct';

const HomePage = (props) => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const getData = () => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        setDatas(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setDatas([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    props.setHistory(history);
  }, [history]);

  return (
    // key object
    // title, category, description, id, image, price, rating[count, rate],
    <Grid container spacing={4}>
      {loading ? (
        Array.from(new Array(8)).map((item, index) => (
          <CardProducts
            loading={loading}
            item={item}
            index={index}
            key={index}
          />
        ))
      ) : datas.length !== 0 ? (
        datas.map((item, index) => (
          <CardProducts
            loading={loading}
            item={item}
            index={index}
            key={index}
          />
        ))
      ) : (
        <div className="w-full mt-6">
          <Typography align="center" variant="h3">
            Halaman Gagal Dimuat
          </Typography>
        </div>
      )}
    </Grid>
  );
};

export default HomePage;
