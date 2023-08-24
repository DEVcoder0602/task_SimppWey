import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const ListingCard = ({ ele }) => {
  return (
    <div>
      <Box
        sx={{ minWidth: 275 }}
        className="my-4 text-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
      >
        <Link to={`/server/${ele.log_id}`} className="text-decoration-none">
          <Card
            variant="outlined"
            style={{ backgroundColor: "#878ee4", color: "white" }}
          >
            <CardContent>
              <Typography
                variant="h4"
                marginBottom={2}
                style={{ textTransform: "capitalize" }}
              >
                {ele.server_name}
              </Typography>
              <Typography gutterBottom>{ele.aws_region}</Typography>
              <Typography sx={{ mb: 1.5 }}>
                Method : {ele.request_method}
              </Typography>
              <Typography sx={{ mb: 1.5 }}>
                Source IP - {ele.source_ip}
              </Typography>
              <Typography sx={{ mb: 1.5 }}>
                {" "}
                Destination IP - {ele.destination_ip}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Box>
    </div>
  );
};

export default ListingCard;
