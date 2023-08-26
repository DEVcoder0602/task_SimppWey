import { useDispatch, useSelector } from "react-redux";
import ListingCard from "./ListingCard";
import { styled } from "@mui/material/styles";
import { Checkbox, FormControlLabel, TextField, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  setSelectedMethod,
  setSelectedRegion,
  setSelectedServer,
} from "../../store/dataSlice";
import { useState } from "react";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Listing = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.allData);
  const selectedServer = useSelector((state) => state.data.selectedServer);
  const selectedRegion = useSelector((state) => state.data.selectedRegion);
  const selectedMethod = useSelector((state) => state.data.selectedMethod);
  const dataFields = useSelector((state) => state.data.dataKeys);

  const [fields, setFields] = useState(dataFields);
  console.log(fields);

  const [searchQuery, setSearchQuery] = useState("");

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

  const handleFieldChange = (e) => {
    const field = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setFields([...fields, field]);
    } else {
      setFields(fields.filter((item) => item !== field));
    }
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
      <div className="filters text-center my-8">
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
        <div>
          <label className="font-bold">Which fields to show : </label>
          {fields.map((field, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  value={field}
                  checked={fields.includes(field)}
                  onChange={handleFieldChange}
                />
              }
              label={field}
            />
          ))}
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Server Name</StyledTableCell>
              <StyledTableCell align="right">Server Region</StyledTableCell>
              <StyledTableCell align="right">Method</StyledTableCell>
              <StyledTableCell align="right">Source IP</StyledTableCell>
              <StyledTableCell align="right">Destination IP</StyledTableCell>
              <StyledTableCell align="right">Response Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((ele) => (
              <StyledTableRow
                key={ele.log_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {ele.server_name}
                </TableCell>
                <TableCell align="right">{ele.aws_region}</TableCell>
                <TableCell align="right">{ele.request_method}</TableCell>
                <TableCell align="right">{ele.source_ip}</TableCell>
                <TableCell align="right">{ele.destination_ip}</TableCell>
                <TableCell align="right">{ele.response_time} s</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Listing;
