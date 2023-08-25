import { useDispatch, useSelector } from "react-redux";
import ListingCard from "./ListingCard";
import {
  Grid,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
} from "@mui/material";
import {
  setSelectedMethod,
  setSelectedRegion,
  setSelectedServer,
} from "../../store/dataSlice";
import { useState } from "react";

const Listing = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.allData);
  const selectedServer = useSelector((state) => state.data.selectedServer);
  const selectedRegion = useSelector((state) => state.data.selectedRegion);
  const selectedMethod = useSelector((state) => state.data.selectedMethod);
  const dataFields = useSelector((state) => state.data.dataKeys);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResult, setFilteredResult] = useState(data);

  // console.log(dataFields);

  const differentServer = Array.from(
    new Set(data.map((ele) => ele.server_name))
  );
  const differentRegion = Array.from(
    new Set(data.map((ele) => ele.aws_region))
  );
  const differentMethod = Array.from(
    new Set(data.map((ele) => ele.request_method))
  );
  // console.log(selectedServer);

  const handleServerChange = (e) => {
    const server = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      dispatch(setSelectedServer([...selectedServer, server]));
    } else {
      dispatch(
        setSelectedServer(selectedServer.filter((item) => item !== server))
      );
    }
  };

  const handleRegionChange = (e) => {
    const region = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      dispatch(setSelectedRegion([...selectedRegion, region]));
    } else {
      dispatch(
        setSelectedRegion(selectedRegion.filter((item) => item !== region))
      );
    }
  };

  const handleMethodChange = (e) => {
    const method = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      dispatch(setSelectedMethod([...selectedMethod, method]));
    } else {
      dispatch(
        setSelectedMethod(selectedMethod.filter((item) => item !== method))
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((item) => {
    const serverMatch =
      selectedServer.length === 0 || selectedServer.includes(item.server_name);
    const regionMatch =
      selectedRegion.length === 0 || selectedRegion.includes(item.aws_region);
    const methodMatch =
      selectedMethod.length === 0 ||
      selectedMethod.includes(item.request_method);
    const searchMatch =
      searchQuery.length === 0 ||
      item.server_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.aws_region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.request_method.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source_ip
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.destination_ip
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return serverMatch && regionMatch && methodMatch && searchMatch;
  });

  return (
    <>
      <div className="filters text-center">
        <div>
          <label className="font-bold">Filter by Server : </label>
          {differentServer.map((server, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  value={server}
                  checked={selectedServer.includes(server)}
                  onChange={handleServerChange}
                />
              }
              label={server}
            />
          ))}
        </div>
        <div>
          <label className="font-bold">Filter by Region : </label>
          {differentRegion.map((region, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  value={region}
                  checked={selectedRegion.includes(region)}
                  onChange={handleRegionChange}
                />
              }
              label={region}
            />
          ))}
        </div>
        <div>
          <label className="font-bold">Filter by Method : </label>
          {differentMethod.map((method, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  value={method}
                  checked={selectedMethod.includes(method)}
                  onChange={handleMethodChange}
                />
              }
              label={method}
            />
          ))}
        </div>
        <div>
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {/* <Button
            variant="contained"
            color="primary"
            onClick={handleSearchClick}
          >
            Search
          </Button> */}
        </div>
      </div>
      <Grid container spacing={5} className="justify-center">
        {filteredData?.map((ele) => {
          return (
            <Grid key={ele.log_id} item>
              <ListingCard ele={ele} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Listing;
