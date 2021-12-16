import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Admin = () => {
  const { products } = useSelector((state) => state.product);
  return (
    <>
      {products.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div className="flex">
                      <div
                        className="img-wrapper grid place-items-center"
                        style={{ width: '130px', height: '130px' }}
                      >
                        <img
                          src={row?.image}
                          alt={row?.title}
                          className="w-8/12 h-28 object-contain"
                        />
                      </div>
                      <div style={{ width: '70%' }}>
                        <Typography component="h1" sx={{ fontWeight: '700' }}>
                          {row?.title?.slice(0, 35)}...
                        </Typography>
                        <Typography variant="body1">
                          {row?.description}
                        </Typography>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="right" sx={{ width: '18%' }}>
                    <TextField
                      id="outlined-basic"
                      label="Stock"
                      variant="outlined"
                      type="number"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained">Update</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h2">No data</Typography>
      )}
    </>
  );
};

export default Admin;
