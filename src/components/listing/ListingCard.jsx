import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ListingCard = ({ ele }) => {
  return (
    <div className="my-4 w-1/4 text-center">
      <Box sx={{ minWidth: 275 }}>
        <Card
          variant="outlined"
          style={{ backgroundColor: "black", color: "white" }}
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
      </Box>
    </div>
  );
};

export default ListingCard;
