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
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
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
  searchTextField: {
    width: '80%',
    marginTop: '10%',
    marginLeft:'20%',
  },
  browseBtn: {
    height: 50,
    width: '60',
    margin: 10,
    color:'#FFFF',
    backgroundColor: '#18453b',
    marginTop: '-3.7%',
    marginLeft: '81%',
  },
  
  
  slogan:{
fontStyle:"Italic",
fontSize:'210%',
color:'#78866b',
marginTop:160,
  }
}));


export default function SearchPage(){ 
const classes = useStyles()

return (
  <Grid container spacing={2}>
    
  <Grid item xs={12}>

  <center><h2 className={classes.slogan}>The Open Road Awaits – Begin Your Car Search!</h2></center>
  <TextField
        className={classes.searchTextField}
        placeholder="Search cars"
        variant="outlined"
        size="big"
      />
  <Button className={classes.browseBtn} variant="contained" size="large" href="/listCar">Find your Ride!</Button> 

  
    
  </Grid>
 
</Grid>

)

}
