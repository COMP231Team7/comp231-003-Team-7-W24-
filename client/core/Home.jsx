import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import auth from '../lib/auth-helper'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import teamLogoImg from './../assets/images/Rentcar.jpg';
import Grid from '@material-ui/core/Grid'
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

const useStyles = makeStyles(theme => ({
  card: {
    width: '90%',
    height:'50%',
    margin: 'auto',
    backgroundColor: '#eae6e5',
    marginTop: theme.spacing(5),
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 700,
    backgroundSize: 'cover'
  },
  content: {
    textAlign: 'center',
  },
  regBtn: {
    height: 50,
    width: 300,
    margin: 10,
    backgroundColor: '#78866b',
    color: '#fff',
    marginTop: '-25%'
  },
  browseBtn: {
    height: 50,
    width: 300,
    margin: 10,
    backgroundColor: '#78866b',
    color: '#fff',
    marginTop: '-25%'
  },
  
  
  slogan:{
fontStyle:"Italic",
color:'#78866b'
  }
}));


export default function Home(){ 
const classes = useStyles()
return (
  <Grid container spacing={2}>
    
  <Grid item xs={12}>
    
  <center><h2 className={classes.slogan}>"Drive the Experience, Rent the Journey!"</h2></center>
    <Card className={classes.card}>
    <CardMedia className={classes.media} image={teamLogoImg} title="Team Logo"/>
  </Card>
  </Grid>
  <Grid item xs={12} container direction="row" justifyContent="center" alignItems="center">
    { 
      auth.isAuthenticated() && <Button
      className={classes.regBtn}
      variant="contained"
      href="/addCar">
        Register your car
    </Button>
    }
    { 
      !auth.isAuthenticated() && <Button
      className={classes.regBtn}
      variant="contained"
      href="/signup">
        Sign Up
    </Button>
    }
    <Button className={classes.browseBtn} variant="contained" size="large" href="/listCar">Browse cars</Button> 
  </Grid>
  <Box
      sx={{
        bgcolor: 'background.paper',
        color: 'text.secondary',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: 1,
        px: 100,
      
          
        
      }}
      component="footer"
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
         
          <Link color="inherit" href="http://localhost:5173/">
          {"Copyright © "} CarBnb
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
</Grid>

)

}
