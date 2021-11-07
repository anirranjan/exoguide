import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    // Wrap the Appbar in a box
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          {/* Show the app name */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ExoGuide
          </Typography>
          
          {/* Have a button routing to the home page */}
          <Button color="inherit" component={Link} to={`/`}>
            Home
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
