//simple imports
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import Button from '@mui/material/Button';
import ComparisonTable from './ComparisonTable';
import { Typography } from '@mui/material';
import { useDebouncedCallback } from 'use-debounce';


export default function Tags() {
  //variable initializations
    const [num,setNum]=useState(0)
    const [inputValue, setInputValue] = useState('');
    const [searchResults,setSearchResults]=useState([]);
    const [selectedPacakges, setSelectedPackages]=useState([]);
    const [comparisonCheck, setComparisonCheck]=useState(false);
    
    
    //Fuction : for Api call
    const fetchData = async (queryOptions:string) => {
      if(queryOptions)
        {
          try {
            const response = await axios.get(`https://api.npms.io/v2/search?q=${queryOptions}`);
            setSearchResults(response.data.results)
          } catch (error) {
            console.error(error);
          }
        }
     
    };
    
  
  const debounced = useDebouncedCallback(
    (value)=>fetchData(value),
    1000
  );

    //handel text change in search filed
    const handleInputChange = (event,value:string):void => {
      setInputValue(value);
      debounced(value);

    };

    // handle Compare button click
    const handleCompareClick=()=>{
      if(selectedPacakges.length<2)
        {
          alert("Should have minimum two packages")
        }
      else{
        console.log("comparing your Packages")
        setComparisonCheck(true);
      }
    }
  
  return (
    <>
    <Stack  sx={{ textAlign:"center", marginTop:5}}>
      <Typography variant='h3'>Compare NPM Packages</Typography>
    <Stack spacing={2} sx={{ width: '100%', marginTop:6}} direction="row" justifyContent="center">
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
           if(value.length<2)
            {
              setComparisonCheck(false);
            }
            console.log("hey");
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
    </Stack>
    {
      comparisonCheck?
      <ComparisonTable selectedPackages={selectedPacakges}/>:
      null
    }
    
    </>
  );
}





// https://www.dhiwise.com/post/ultimate-guide-to-implementing-react-debounce-effectively
//https://levelup.gitconnected.com/using-material-uis-autocomplete-to-build-a-count-limited-multiselect-c1e351ef6e1d