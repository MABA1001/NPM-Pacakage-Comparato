//simple imports
import { useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { debounce } from 'lodash';
import axios from 'axios'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// table imports
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function Tags() {
  //variable initializations
    const [num,setNum]=useState(0)
    const [inputValue, setInputValue] = useState('');
    const [searchResults,setSearchResults]=useState([]);
    const [tableCheck,setTableCheck]=useState(false);
    const [selectedPacakges, setSelectedPackages]=useState([]);
    const [rowData,setRowdata]=useState([]);


    //Fuction : for Api call
    const fetchData = async (queryOptions:string) => {
      if(queryOptions)
        {
          try {
            const response = await axios.get(`https://api.npms.io/v2/search?q=${queryOptions}`);
            console.log(`https://api.npms.io/v2/search?q=${queryOptions}`)
            console.log(response.data.results);
            setSearchResults(response.data.results)
            console.log(typeof(response.data.results))
          } catch (error) {
    
            console.error(error);
          }
        }
     
    };
    

    // Debouncing function, delay the Api call for a given time.
    const debouncedSearch = debounce((searchTerm:string) => {
      fetchData(searchTerm);
    }, 200);
    

    //handel text change in search filed
    const handleInputChange = (event,value:string) => {
      setInputValue(value);
      debouncedSearch(value);
    };

    // handle Compare button click
    const handleCompareClick=()=>{
      if(num<2)
        {
          console.log("Should have minimum 2 packages to compare")
        }
      else{
        console.log("comparing your Packages")
        setTableCheck(true);
        const rows = [
          createData('Description',selectedPacakges[0].package.description, selectedPacakges[0].package.description),
          // createData('Keywords', 237, 9.0,),
          // createData('Repository', 262, 16.0,),
          // createData('Licenses', 305, 3.7,),
          // createData('Last Modification Date', 356, 16.0),
          createData('Authors/publishers', selectedPacakges[0].package.name,selectedPacakges[0].package.name),
          // createData('Maintainers', 356, 16.0)
        ];
        setRowdata(rows);
      }
    }

    //table area and handeling
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
    
    function createData(
      attributeName: string,
      firstPackageValue: string,
      secondPackagevalue: string
    ) {
      return { attributeName,  firstPackageValue,   secondPackagevalue};
    }
    
    
    

  return (
    <>
    <Stack spacing={2} sx={{ width: '100%'}} direction="row">
      <Autocomplete
        multiple
        id="tags-outlined"
        options={searchResults}
        getOptionLabel={(option) => option.package.name}
        filterSelectedOptions
        onInputChange={handleInputChange}
        onChange={(event, value:[]) => {
           setNum(value.length);
           setSelectedPackages(value);
           console.log("Selected: ",value)
          }}
          getOptionDisabled={(option) => (num === 2? true : false)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Choose any two npm pacakages to compare"
          />
        )}
        sx={{ width: '70%'}}
      />
       <Button variant="contained" onClick={handleCompareClick}>Compare</Button>
    </Stack>
    


    {
      tableCheck?
      <Box mt={3} p={10}>
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Package Name</StyledTableCell>
            <StyledTableCell align="right">{selectedPacakges[0].package.name}</StyledTableCell>
            <StyledTableCell align="right">{selectedPacakges[1].package.name}</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row) => (
            <StyledTableRow key={row.attributeName}>
              <StyledTableCell component="th" scope="row">
                {row.attributeName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.firstPackageValue}</StyledTableCell>
              <StyledTableCell align="right">{row.secondPackagevalue}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


      </Box>:null
    }

    </>
  );
}





// https://www.dhiwise.com/post/ultimate-guide-to-implementing-react-debounce-effectively