import { useDispatch, useSelector } from "react-redux";
import ListingCard from "./ListingCard";
import { Grid } from "@mui/material";

const Listing = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.allData);
  // console.log(data);

  return (
    <>
      <Grid container spacing={5} className="justify-center">
        {data.map((ele) => {
          return (
            <Grid key={ele.log_id} item>
              <ListingCard ele={ele} />
            </Grid>
          );
        })}
        {/* <Grid item>
          <ListingCard />
        </Grid> */}
        {/* <Grid item>
          <ListingCard />
        </Grid>
        <Grid item>
          <ListingCard />
        </Grid>
        <Grid item>
          <ListingCard />
        </Grid>
        <Grid item>
          <ListingCard />
        </Grid>
        <Grid item>
          <ListingCard />
        </Grid> */}
      </Grid>
    </>
  );
};

export default Listing;
