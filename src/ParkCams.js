import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const ParkCams = () => {
  const { id } = useParams();
  const [camData, setCamData] = useState([]);
  //the useEffect hooks makes a request to the API to get non-streaming images from the park
  useEffect(() => {
    Axios.get(
      `https://developer.nps.gov/api/v1/webcams?parkCode=${id}&api_key=${process.env.REACT_APP_NPS_API_KEY}`
    ).then((response) => {
      for (var i = 0; i < response.data.data.length; i++) {
        if (response.data.data[i].images.length > 0) {
          for (var j = 0; j < response.data.data[i].images.length; j++) {
            addData(response.data.data[i].images[j]);
          }
        }
      }
    });
  }, [id]);

  //addData appends images that were found to the camData useState
  const addData = (newCamInfo) =>
    setCamData((camData) => [...camData, newCamInfo]);

  //conditionally render the component based on whether or not any non-streaming images were found
  if (camData.length > 0) {
    return (
      // display the page's heading
      <div className="parkData">
        <Grid
          container
          direction="column"
          justifyContent="left"
          alignItems="left"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h2" component="div">
              {id} Park Images
            </Typography>
          </Grid>

          <Grid item>
            {/* display images found in image gallery */}
            <ImageList
              sx={{ width: 500, height: 450 }}
              cols={3}
              rowHeight={164}
            >
              {camData.map((item) => (
                <ImageListItem key={item.title}>
                  <img
                    src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.altText}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>

          <Grid item>
            {/* display button that links to the park's information page*/}
            <Button variant="contained" component={Link} to={`/park/${id}`}>
              {id} Information Page
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return (
      <div class="parkData">
        <Grid
          container
          direction="column"
          justifyContent="left"
          alignItems="left"
          spacing={2}
        >
          <Grid item>
            {/* display unavailable images alert */}
            <Alert severity="error">
              {id} - No Available Images at the moment
            </Alert>
          </Grid>

          <Grid item>
            {/* display button that links to the park's information page*/}
            <Button variant="contained" component={Link} to={`/park/${id}`}>
              {id} Information Page
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default ParkCams;
