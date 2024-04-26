import { useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { debounce } from 'lodash';
import axios from 'axios'
import Button from '@mui/material/Button';



export default function Tags() {
  //variable initializations
    const [num,setNum]=useState(0)
    const [inputValue, setInputValue] = useState('');
    const [searchResults,setSearchResults]=useState([])



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
    
    const debouncedSearch = debounce((searchTerm:string) => {
      fetchData(searchTerm);
    }, 200);
    
    const handleInputChange = (event,value:string) => {
      setInputValue(value);
      debouncedSearch(value);
    };
    


  return (
    <Stack spacing={2} sx={{ width: '100%'}} direction="row">
      <Autocomplete
        multiple
        id="tags-outlined"
        options={searchResults}
        getOptionLabel={(option) => option.package.name}
        filterSelectedOptions
        onInputChange={handleInputChange}
        onChange={(event, value:string) => {
           setNum(value.length)
          }}
          getOptionDisabled={(option) => (num === 2? true : false)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Choose any two npm pacakages to compare"
          />
        )}
      />
    </Stack>
  );
}

