import axios from "axios";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const HomePage = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        // console.log(res)
        setDatas(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setDatas([]);
        setLoading(false);
      })
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    // key object
    // title, category, description, id, image, price, rating[count, rate],
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
      {loading ?
        'loading...' : datas.length !== 0 ?
          datas.map((data) => (
            <Card
              sx={{ maxWidth: 345 }}
              className="mb-8"
            >
              <CardMedia
                component="img"
                height="100"
                image={data?.image}
                alt={data?.title || 'image'}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data?.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">detail</Button>
                <Button size="small">Add To Cart</Button>
              </CardActions>
            </Card>
          ))
          : 'data tidak ditemukan'
      }
    </div>
  )
}

export default HomePage;
