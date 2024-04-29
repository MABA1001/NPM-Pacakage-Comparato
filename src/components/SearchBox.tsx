//simple imports
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {debounce } from 'lodash';
import axios from 'axios'
import Button from '@mui/material/Button';
import ComparisonTable from './ComparisonTable';


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
    
    // Debouncing function, delay the Api call for a given time.
    const debouncedSearch = debounce((searchTerm:string) => {
      fetchData(searchTerm);
    }, 200);
    

    //handel text change in search filed
    const handleInputChange = (event,value:string):void => {
      setInputValue(value);
      debouncedSearch(value);
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
    <Stack spacing={2} sx={{ width: '100%'}} direction="row" justifyContent="center">
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