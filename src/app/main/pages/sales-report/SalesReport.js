import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function SalesReportPage() {
  const { products } = useSelector((state) => state.product);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="right">Harga</StyledTableCell>
            <StyledTableCell align="right">Terjual</StyledTableCell>
            <StyledTableCell align="right">Pendapatan</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length !== 0 ?
            (products.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="right">$ {row.price}</StyledTableCell>
                <StyledTableCell align="right">{row.sold}</StyledTableCell>
                <StyledTableCell align="right">{row.sold * row.price}</StyledTableCell>
              </StyledTableRow>
            ))) :
            (
              <Typography variant="h4">No data</Typography>
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
