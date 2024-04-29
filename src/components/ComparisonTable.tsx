import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DownloadsGraph from './DownloadsGraph';

export default function ComparisonTable({ selectedPackages }) {
  const [firstPackagedata, setFirstPackageData] = useState({});
  const [secondPackageData, setSecondPackageData] = useState({});
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`https://api.npms.io/v2/package/${selectedPackages[0].package.name}`);
        setFirstPackageData(response1.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [selectedPackages]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await axios.get(`https://api.npms.io/v2/package/${selectedPackages[1].package.name}`);
        setSecondPackageData(response2.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [selectedPackages]);

  useEffect(() => {
    if (Object.keys(firstPackagedata).length > 0 && Object.keys(secondPackageData).length > 0) {
      setRows([
        createData('Description', firstPackagedata.collected.metadata.description, secondPackageData.collected.metadata.description),
        createData('Keywords', firstPackagedata.collected.metadata.keywords[1], secondPackageData.collected.metadata.keywords[1]),
        createData('Repository', 262, 16.0),
        createData('License', firstPackagedata.collected.metadata.license, secondPackageData.collected.metadata.license),
        createData('Last Modification Date', firstPackagedata.analyzedAt, secondPackageData.analyzedAt),
        createData('Authors/Publishers', firstPackagedata.collected.metadata.author.name, secondPackageData.collected.metadata.author.name),
        createData('Maintainers', firstPackagedata.collected.metadata.maintainers[0].username, secondPackageData.collected.metadata.maintainers[0].username),
      ]);
    }
  }, [firstPackagedata, secondPackageData]);

  function createData(
    packageName,
    firstPackageValue,
    secondPackageValue,
  ) {
    return { packageName, firstPackageValue, secondPackageValue };
  }

  return (
    <>
      {Object.keys(firstPackagedata).length > 0 && Object.keys(secondPackageData).length > 0 && (
        <>
        <TableContainer component={Paper} elevation={5} sx={{
                padding: 3,
                width:"65%",
                marginLeft:'auto',
                marginRight:'auto',
                marginTop:6,
                marginBottom:3
          }} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Package Name</TableCell>
                <TableCell align="right">{firstPackagedata.collected.metadata.name}</TableCell>
                <TableCell align="right">{secondPackageData.collected.metadata.name}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.packageName}
                  </TableCell>
                  <TableCell align="right">{row.firstPackageValue}</TableCell>
                  <TableCell align="right">{row.secondPackageValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <DownloadsGraph packageOne={firstPackagedata} packageTwo={secondPackageData}/>
      </>
      )}
    </>
  );
}
