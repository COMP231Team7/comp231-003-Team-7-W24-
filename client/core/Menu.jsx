import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from "@material-ui/core/styles"
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import InputIcon from '@material-ui/icons/Input'
import Button from '@material-ui/core/Button'
import auth from '../lib/auth-helper'
import Grid from '@material-ui/core/Grid'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import carBnbLogo from './../assets/images/carbnb.png';


const isActive = (location, path) => {
  return location.pathname === path ? { color: '#5b9279' } : { color: '#12130f' };
};
export default function Menu(){ 
  const navigate = useNavigate();
  const location = useLocation();

  const toHome = () => {
    navigate("/");
  };

  const useStyles = makeStyles(theme => ({
    carbnb: {
      height: 70
    }
  }));
  const classes = useStyles()

  return (
  <AppBar position="static">
    <Toolbar>
      <Grid container>
        <Grid item xs={2}>
        <img src={carBnbLogo} className={classes.carbnb} alt="carbnb" onClick={toHome} />
      
        </Grid>
        <Grid item xs={10} container direction="row" justifyContent="flex-end" alignItems="center">
          {
            !auth.isAuthenticated() && (<span>
              <Link to="/signin">
                <Button style={isActive(location, "/signin")}><InputIcon/> Sign In
                </Button>
              </Link>

              <Link to="/Ratings">
                <Button style={isActive(location, "/Ratings")}>Rate your experience | </Button>
              </Link> 

              <Link to="/SearchPage">
                <Button style={isActive(location, "/SearchPage")}>Search Car | </Button>
              </Link> 
            </span>)
          }
            
          {
            auth.isAuthenticated() && (<span>
              
              <Link to="/">
                <IconButton aria-label="Home" style={isActive(location, "/")}>
                  <HomeIcon/>
                </IconButton>
              </Link>




              {/*
               <Link to="/users">
                <Button style={isActive(location, "/users")}>Users</Button>
            </Link> */}
           <Link to="/addCar">
                <Button style={isActive(location, "/addCar")}>Car Register</Button>
              </Link> 
      
   
              <Link to={"/user/" + auth.isAuthenticated().user._id} >
                <Button style={isActive(location, "/user/" + auth.isAuthenticated().user._id)}>My Profile   |</Button>
              </Link>
            
              <Link to="/ListCar">
                <Button style={isActive(location, "/ListCar")}>List Car | </Button>
              </Link> 

              
              <Button color="inherit" onClick={() => {
                  auth.clearJWT(() => navigate('/'));
                }}><ExitToAppIcon/> Sign out</Button>
            </span>)
            
          }
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);
};


