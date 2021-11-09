import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import ReactMapGL, { Marker } from "react-map-gl";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";
import CloudTwoToneIcon from "@mui/icons-material/CloudTwoTone";
import LocalActivityTwoToneIcon from "@mui/icons-material/LocalActivityTwoTone";
import Grid from "@mui/material/Grid";

const SpecificPark = () => {
  const [parkLat, setParkLat] = useState(0);
  const [parkLng, setParkLng] = useState(0);
  const [park, setPark] = useState([]);
  const [activities, setActivities] = useState([]);
  const { id } = useParams();

  //the useEffect hooks makes a request to the API to get information about the specific park
  useEffect(() => {
    Axios.get(
      `https://developer.nps.gov/api/v1/parks?parkCode=${id}&api_key=${process.env.REACT_APP_NPS_API_KEY}`
    ).then((response) => {
      setParkLat(parseFloat(response.data.data[0].latitude));
      setParkLng(parseFloat(response.data.data[0].longitude));
      setPark(response.data.data[0]);
      setActivities(response.data.data[0].activities);
    });
  }, [id]);

  return (
    <div className="parkData">
      <Grid
        container
        direction="column"
        justifyContent="left"
        alignItems="left"
        spacing={2}
      >
        <Grid item>
          {/* Heading that displays the park's name */}
          <Typography variant="h2" component="div">
            {park.name}
          </Typography>
        </Grid>

        <Grid item>
          {/* Paragraph that contains a description of the park */}
          <Typography variant="body1" component="div">
            {park.description}
          </Typography>
        </Grid>

        <Grid item>
          {/* Heading that displays the park's name */}
          <Typography variant="h4" component="div">
            <MapTwoToneIcon /> Directions
          </Typography>
        </Grid>

        <Grid item>
          {/* Paragraph that contains information about the weather at the national park*/}
          <Typography variant="body1" component="div">
            {park.directionsInfo}
          </Typography>
        </Grid>

        <Grid item>
          {/* Display the park's location on a map */}
          <ReactMapGL
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
            latitude={parkLat}
            longitude={parkLng}
            zoom={8}
            width="100%"
            height="50vh"
            mapStyle={"mapbox://styles/mapbox/streets-v11"}
          >
            {/* Place a marker on the park's location */}
            <Marker latitude={parkLat} longitude={parkLng}>
              <LocationOnIcon style={{ color: "red" }} />
            </Marker>
          </ReactMapGL>
          </Grid>

        <Grid item>
          {/* Heading that displays the park's name */}
          <Typography variant="h4" component="div">
            <CloudTwoToneIcon /> Weather Info
          </Typography>
        </Grid>

        {/* Paragraph that contains information about the weather at the national park*/}
        <Grid item>
          <Typography variant="body1" component="div">
            {park.weatherInfo}
          </Typography>
        </Grid>

        <Grid item>
          {/* Heading that displays the available activities */}
          <Typography variant="h4" component="div">
            <LocalActivityTwoToneIcon /> Activities
          </Typography>
        </Grid>

        <Grid item>
          {/* List that displays the available activities at the park */}
          <ul>
            {activities.map((item) => (
              <li key={item.id}>
                <Typography variant="body2" component="div">
                  {item.name}
                </Typography>
              </li>
            ))}
          </ul>
        </Grid>
      </Grid>
    </div>
  );
};

export default SpecificPark;
