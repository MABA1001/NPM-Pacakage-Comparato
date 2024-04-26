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
        setTableCheck(true)
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
      name: string,
      calories: number,
      fat: number,
      carbs: number,
      protein: number,
    ) {
      return { name, calories, fat, carbs, protein };
    }
    
    const rows = [
      createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      createData('Eclair', 262, 16.0, 24, 6.0),
      createData('Cupcake', 305, 3.7, 67, 4.3),
      createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];
    

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
      <Box>
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Package Name</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
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