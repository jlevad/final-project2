import { useState } from 'react';
import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { updateStock } from '../../../redux/productRedux';

const Admin = () => {
  const { products, loading } = useSelector((state) => state.product);
  const dispatch = useDispatch()
  const [newStock, setNewStock] = useState(0)

  const handleUpdateStock = (data) => {
    if (newStock) {
      dispatch(updateStock({ ...data, stock: parseInt(newStock) }))
    } else {
      dispatch(updateStock({ ...data, stock: 0 }))
    }
  }

  return (
    <>
      {loading ?
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        </Grid>
        : products.length !== 0 ?
          products.map((row) => (
            <Card className="p-4 m-4">
              <div className="flex flex-col md:flex-row">
                <div className="img-wrapper grid place-items-center" style={{ width: '130px', height: '130px' }}>
                  <img src={row?.image} alt={row?.title} className="w-8/12 h-28 object-contain" />
                </div>
                <div className="w-full">
                  <Typography component="h1" sx={{ fontWeight: '700' }}>
                    {row?.title}
                  </Typography>
                  <Typography>
                    {row?.description.slice(0, 200)}...
                  </Typography>
                </div>
                <div className="m-4 flex flex-row items-center justify-center">
                  <TextField
                    id="outlined-basic"
                    label="Stock"
                    variant="outlined"
                    type="number"
                    size="small"
                    defaultValue={row?.stock}
                    onChange={(e) => setNewStock(e.target.value)}
                  />
                  <div className="justify-end ml-4">
                    <Button
                      variant="contained"
                      onClick={() => handleUpdateStock(row)}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
          :
          <div className="w-full text-center">
            <Typography>Data Not Found</Typography>
          </div>
      }
    </>
  );
};

export default Admin;
