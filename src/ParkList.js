import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import "./App.css";

const ParkList = ({ nationalParks }) => {
  return (
    <div className="park-grid">
      {/* iterate through each park and display an overview about each one */}
      {nationalParks.map((nationalPark) => (
        // card to display the park's information
        <Card sx={{ width: 345, margin: 5 }} key={nationalPark.parkCode}>
          <CardActionArea>
            <CardContent>
              {/* The Park's Name*/}
              <Typography gutterBottom variant="h5" component="div">
                {nationalPark.fullName}
              </Typography>

              {/* The Type of National Park*/}
              <Typography variant="body2" color="text.secondary">
                {nationalPark.designation}
              </Typography>
            </CardContent>
          </CardActionArea>

          <CardActions>
            {/* Button that links to information component for the park*/}
            <Button
              size="small"
              color="primary"
              component={Link}
              to={`/park/${nationalPark.parkCode}`}
            >
              Learn More
            </Button>

            {/* Button that links to park cameras component for the park*/}
            <Button
              size="small"
              color="primary"
              component={Link}
              to={`/parkcams/${nationalPark.parkCode}`}
            >
              View Images
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default ParkList;
