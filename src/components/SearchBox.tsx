//simple imports
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ComparisonTable from "./ComparisonTable";
import { Typography } from "@mui/material";
import { useDebouncedCallback } from "use-debounce";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { getPackagesApiCall } from "./../utils/apiUtils";

export default function Tags() {
  //variable initializations
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPacakges, setSelectedPackages] = useState([]);
  const [comparisonCheck, setComparisonCheck] = useState(false);
  const [displayNotification, setDisplayNotification] = useState(false);

  const fetchData = async (queryOptions: string) => {
    if (queryOptions) {
      const response = await getPackagesApiCall(queryOptions);
      setSearchResults(response);
    }
  };

  const debounced = useDebouncedCallback((value) => fetchData(value), 1000);

  //handel text change in search filed
  const handleInputChange = (event, value: string): void => {
    setInputValue(value);
    debounced(value);
  };

  // handle Compare button click
  const handleCompareClick = () => {
    if (selectedPacakges.length < 2) {
      setDisplayNotification(true);
    } else {
      console.log("comparing your Packages");
      setComparisonCheck(true);
    }
  };

  const handleCloseNotification = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setDisplayNotification(false);
  };

  const handleSelectionChange = (event, value: []) => {
    setSelectedPackages(value);
    if (value.length < 2) {
      setComparisonCheck(false);
    }
  };

  function handelOptionLabel(option) {
    return option.package.name;
  }

  function handelOptionDisable(option) {
    return selectedPacakges.length === 2 ? true : false;
  }

  return (
    <>
      <Stack sx={{ textAlign: "center", marginTop: 5 }}>
        <Typography variant="h3">Compare NPM Packages</Typography>
        <Stack
          spacing={2}
          sx={{ width: "100%", marginTop: 6 }}
          direction="row"
          justifyContent="center"
        >
          <Autocomplete
            multiple
            id="tags-outlined"
            options={searchResults}
            getOptionLabel={handelOptionLabel}
            filterSelectedOptions
            onInputChange={handleInputChange}
            onChange={handleSelectionChange}
            getOptionDisabled={handelOptionDisable}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Choose any two npm pacakages to compare"
              />
            )}
            sx={{ width: "70%" }}
          />
          <Button variant="contained" onClick={handleCompareClick}>
            Compare
          </Button>
          <Snackbar
            open={displayNotification}
            autoHideDuration={2000}
            onClose={handleCloseNotification}
          >
            <Alert
              onClose={handleCloseNotification}
              severity="info"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Select Two packages to compare
            </Alert>
          </Snackbar>
        </Stack>
      </Stack>
      {comparisonCheck ? (
        <ComparisonTable selectedPackages={selectedPacakges} />
      ) : null}
    </>
  );
}
