import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './../styles/tableStyles.css'

export default function TableComponent({ rows,firstPackageName ,secondPackageName }) {
  
  return (
       <TableContainer component={Paper} elevation={5} className='table-container' sx={{width: "65%"}} >
  <Table aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell style={{ backgroundColor: 'transparent' }}>Package Name</TableCell>
        <TableCell align="right">{firstPackageName}</TableCell>
        <TableCell align="right">{secondPackageName}</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row, index:number) => (
        <TableRow key={index}>
          <TableCell component="th" scope="row" style={{ textAlign: 'center' }}>
            {row.packageName}
          </TableCell>
          <TableCell align="right">{row.firstPackageValue}</TableCell>
          <TableCell align="right">{row.secondPackageValue}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>)

}