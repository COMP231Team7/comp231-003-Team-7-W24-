import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import auth from '../lib/auth-helper'
import { list } from "./api-car.js";
import Typography from "@material-ui/core/Typography";
import { remove } from "./api-car.js";
import { useNavigate } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import carImg from './../assets/images/car_owner.webp';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 20
  },
  textField: {
    // Define your text field styles here
  },
  error: {
    // Define your error icon styles here
  },
  submit: {
    // Define your submit button styles here
  },
  title: {
    paddingTop: 20,
    paddingLeft: 20
  },
  lease: {
    paddingTop: 20,
    paddingLeft: 10
  },
  root: {
    margin:20
  },
  media: {
    minHeight: 150,
    backgroundSize: 'contain',
    margin: 10,
    backgroundColor: '#a2a88a',
  },
  editBtn: {
    color: '#eae6e5',
    backgroundColor: '#5b9279',
    marginRight: 5
  },
  deleteBtn: {
    color: '#eae6e5',
    backgroundColor: '#a44a3f'
  }
}));

export default function Ratings() {
  const [User, setUser] = useState([]);
  const [redirectToList, setRedirect] = useState(false);
  const navigate = useNavigate();
  // const [displayDetail] = false;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setUser(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  // const displayDetails = () => {
  //   displayDetail = true;
  // };

  

  if (redirectToList) {
    setRedirect(false);
    window.location.reload();
  }

  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h4" className={classes.title}>
        <center>Car Owners</center>
      </Typography>
      <Grid container>
        {User.map((User, i) => {
          return (
              <Grid item xs={3} button key={i}>
                <Card className={classes.card} variant="outlined">
                  <CardMedia sx={{ height: 140 }} className={classes.media} image={carImg} title="Car"/>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {User.fname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                     {User.lname}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Grid container spacing={2}>
                 
                    <Grid item xs={12}>

                    {
                      !auth.isAuthenticated() && <span>
                     <Button size="small" variant="contained" className={classes.editBtn}>Rate Your Experience</Button> 
                      <Typography variant="h6" className={classes.lease}>
                        Lease Information:
                      </Typography>
                      </span>
                    }
                    </Grid>
                    <Grid item xs={12}>
                    {
                      !auth.isAuthenticated() && <span>
                            <div><Chip label={"Name " + User.fname} variant="outlined" /></div>
                            <div><Chip label={"Email: " + User.email} variant="outlined" /></div>
                            <div><Chip label={"Phone number: " + User.phone} variant="outlined" /></div>
                      <div><Chip label={"Postal Code: " + User.postal} variant="outlined" /></div>
                      </span>
                    }
                    </Grid>
                  </Grid>
                
                  </CardActions>
                </Card>
              </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}
