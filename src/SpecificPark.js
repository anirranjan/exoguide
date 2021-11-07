import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import ReactMapGL, { Marker } from "react-map-gl";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";
import CloudTwoToneIcon from "@mui/icons-material/CloudTwoTone";
import LocalActivityTwoToneIcon from '@mui/icons-material/LocalActivityTwoTone';

const SpecificPark = () => {
  const [parkLat, setParkLat] = useState(0);
  const [parkLng, setParkLng] = useState(0);
  const [park, setPark] = useState([]);
  const [activities, setActivities] = useState([]);
  const { id } = useParams();
  let NPS_API_KEY = process.env.REACT_APP_API_KEY;
  let MAPBOX_API_KEY = process.env.REACT_APP_MAP_API_KEY;

  //the useEffect hooks makes a request to the API to get information about the specific park
  useEffect(() => {
    Axios.get(
      `https://developer.nps.gov/api/v1/parks?parkCode=${id}&api_key=${NPS_API_KEY}`
    ).then((response) => {
      setParkLat(parseFloat(response.data.data[0].latitude));
      setParkLng(parseFloat(response.data.data[0].longitude));
      setPark(response.data.data[0]);
      setActivities(response.data.data[0].activities);
    });
  }, [id, NPS_API_KEY]);

  return (
    <div className="parkData">
      {/* Heading that displays the park's name */}
      <Typography variant="h2" component="div">
        {park.name}
      </Typography>

      {/* Paragraph that contains a description of the park */}
      <Typography variant="body1" component="div">
        {park.description}
      </Typography>

      {/* Heading that displays the park's name */}
      <Typography variant="h4" component="div">
        <MapTwoToneIcon /> Directions
      </Typography>

      {/* Paragraph that contains information about the weather at the national park*/}
      <Typography variant="body1" component="div">
        {park.directionsInfo}
      </Typography>

      {/* Display the park's location on a map */}
      <ReactMapGL
        mapboxApiAccessToken={MAPBOX_API_KEY}
        latitude={parkLat}
        longitude={parkLng}
        zoom={8}
        width="100%"
        height="50vh"
        mapStyle={"mapbox://styles/mapbox/streets-v11"}
      >
        {/* Place a marker on the park's location */}
        <Marker latitude={parkLat} longitude={parkLng}>
          <LocationOnSharpIcon />
        </Marker>
      </ReactMapGL>

      {/* Heading that displays the park's name */}
      <Typography variant="h4" component="div">
        <CloudTwoToneIcon /> Weather Info
      </Typography>

      {/* Paragraph that contains information about the weather at the national park*/}
      <Typography variant="body1" component="div">
        {park.weatherInfo}
      </Typography>

      <Typography variant="h4" component="div">
        <LocalActivityTwoToneIcon/> Activities
      </Typography>

      <ul>
        {activities.map((item) => (
          <li key={item.id}>
            <Typography variant="body2" component="div">
              {item.name}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpecificPark;
