import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import ParkList from "./ParkList";
import ParkCams from "./ParkCams";
import SpecificPark from "./SpecificPark";
import Navbar from "./Navbar";
import { Typography, TextField, Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Route, BrowserRouter, Switch } from "react-router-dom";


function App() {
  let NPS_API_KEY = process.env.REACT_APP_API_KEY;
  const [activities, setActivites] = useState([]);
  const [parks, setParks] = useState([]);

  //the useEffect hook makes an API request to get the list of available activities
  useEffect(() => {
    Axios.get(
      `https://developer.nps.gov/api/v1/activities?&api_key=${NPS_API_KEY}`
    ).then((response) => {

      //create an array to store the activities retrieved from the the API request
      const options = response.data.data.map((i) => ({
        label: i.name,
        id: i.id,
      }));
      //update the activities state with the array of activities
      setActivites(options);
    });
  }, [NPS_API_KEY]);
  
  //getParks makes an API request to get the list of parks that have the selected activity from the dropdown
  const getParks = (activityID) => {
    Axios.get(`https://developer.nps.gov/api/v1/activities/parks?id=${activityID}&api_key=${NPS_API_KEY}`).then((response) => {
      //console.log(response.data.data[0].parks);
      
      //update the parks state with the array of parks that we receieved from the API
      setParks(response.data.data[0].parks)
    })
  }

  return (
    <div className="App">
      <div className="content">
        <BrowserRouter>
        <Navbar/>
          <Switch>
            {/* route to the home page*/}
            <Route exact path="/">
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={3}
              >

                {/* app heading */}
                <Grid item>
                  <Typography variant="h2" component="div">
                    ExoGuide
                  </Typography>
                </Grid>

                {/* app heading */}
                <Grid item>
                  <Typography variant="body1" component="div">
                    Learn more about various national parks all over the nation!
                  </Typography>
                </Grid>

                {/* dropdown of activities to do at the parks */}
                <Grid item>
                  <Autocomplete
                    id="activity-list"
                    options={activities}
                    sx={{ width: 300 }}
                    onChange={(event, value) => {
                      if(value !== null){
                        getParks(value.id);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label=" Search Activities" />
                    )}
                  />
                </Grid>
              </Grid>

              {/* component to display parks that have the selected activity */}
              <ParkList nationalParks={parks} />
            </Route>
            
            {/* route to the information component for the specific park */}
            <Route path="/park/:id" component={SpecificPark} />

            {/* route to the park cameras component for the specific park */}
            <Route path="/parkcams/:id" component={ParkCams} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
