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

type Tcollected={
  metadata: Tmetadata;
  npm:Tnpm;
}
type Tevaluation={
  popularity: {communityInterest:number;downloadsCount:number;};
  quality:{carefulness: number; health: number,tests:number;};
}
type Tmetadata={
  author:{name:string; email: string;};
  description: string;
  keywords: Array<string>;
  links:{npm:string,homepage:string,respository: string};
  maintainers: Array<Tmaintainers>;
  publisher: {username: string, email: string};
  name: string;
  license:string;
}

type Tpackage={
  analyzedAt: string;
  collected: Tcollected;
  evaluation: Tevaluation;
}

type Tnpm={
  downloads: Tdownloads;
  starsCount: number;
}

type Tdownloads={
  index: number;
  downloadsData:TdownloadsData; 
}

type TdownloadsData={
  from: string;
  to: string;
  count: number;
}

type Tmaintainers={
  username:string;
   email:string;
}

type Trows={
  packageName:string, firstPackageValue: string|number, secondPackageValue: string|number
}


export default function ComparisonTable({ selectedPackages }) {
  const [firstPackagedata, setFirstPackageData] = useState<Tpackage| undefined>();
  const [secondPackageData, setSecondPackageData] = useState<Tpackage| undefined>();
  const [rows, setRows] = useState<Array<Trows>>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get<Tpackage>(`https://api.npms.io/v2/package/${selectedPackages[0].package.name}`);
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
        const response2 = await axios.get<Tpackage>(`https://api.npms.io/v2/package/${selectedPackages[1].package.name}`);
        setSecondPackageData(response2.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [selectedPackages]);

  useEffect(() => {
    if (firstPackagedata&&secondPackageData) {
      setRows([
        createData('Description', firstPackagedata.collected.metadata.name, secondPackageData.collected.metadata.description),
        createData('Keywords', firstPackagedata.collected.metadata.keywords?firstPackagedata.collected.metadata.keywords[0]:"N/A", secondPackageData.collected.metadata.keywords?secondPackageData.collected.metadata.keywords[0]:"N/A"),
        createData('License', firstPackagedata.collected.metadata.license?firstPackagedata.collected.metadata.license:"N/A",secondPackageData.collected.metadata.license?secondPackageData.collected.metadata.license:"N/A"),
        createData('Last Modification Date', firstPackagedata.analyzedAt, secondPackageData.analyzedAt),
        createData('Authors/Publishers', firstPackagedata.collected.metadata.author?firstPackagedata.collected.metadata.author.name:"N/A", secondPackageData.collected.metadata.author?secondPackageData.collected.metadata.author.name:"N/A"),
        createData('Maintainers', firstPackagedata.collected.metadata.maintainers[0]?firstPackagedata.collected.metadata.maintainers[0].username:"null", secondPackageData.collected.metadata.maintainers[0]?secondPackageData.collected.metadata.maintainers[0].username:"null"),
      ]);
    }
  }, [firstPackagedata, secondPackageData]);

  function createData(
    packageName: string,
    firstPackageValue:string|number,
    secondPackageValue:string|number,
  ):Trows {
    return { packageName, firstPackageValue, secondPackageValue };
  }

  return (
    <>
      {firstPackagedata &&secondPackageData&& (
        <>
        <TableContainer component={Paper} elevation={5} sx={{
                padding: 3,
                width:"65%",
                marginLeft:'auto',
                marginRight:'auto',
                marginTop:10,
                marginBottom:3
          }} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Package Name</TableCell>
                <TableCell align="right">{firstPackagedata?.collected.metadata.name}</TableCell>
                <TableCell align="right">{secondPackageData?.collected.metadata.name}</TableCell>
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