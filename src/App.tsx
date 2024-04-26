import './App.css'
import SearchBox from './components/SearchBox'
import axios from 'axios'

function App() {
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("https://api.npms.io/v2/search?q=re");
  //     console.log(response.data);
  //   } catch (error) {
  //     // Handle error
  //     console.error(error);
  //   }
  // };
  
  // fetchData();
  return (
    <>
    <SearchBox/>

    </>
  )
}

export default App
