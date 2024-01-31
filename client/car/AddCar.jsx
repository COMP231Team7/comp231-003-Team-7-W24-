import React, { useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { create } from "./api-car";
import { read } from "./../user/api-user.js";
import { useParams } from "react-router-dom";
import auth from "../lib/auth-helper.js";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    margin: "0 auto",
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    textAlign: "center",
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  error: {
    color: "red",
  },
  submit: {
    margin: "0 auto",
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: 18,
  },
}));


export default function AddCar() {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    
    read(
      {
        userId: auth.isAuthenticated().user._id,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data) {
        setUser(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [userId]);

  const [values, setValues] = useState({
    model: "",
    description: "",
    year: 0,
    seats: 0,
    transmission: "",
    fuelType: "",
    mileage: ""
  });

  const [open, setOpen] = useState(false);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clickSubmit = () => {
    const car = {
      model: values.model || undefined,
      description: values.description || undefined,
      year: values.year || undefined,
      seats: values.seats || undefined,
      transmission: values.transmission || undefined,
      fuelType: values.fuelType || undefined,
      mileage: values.mileage || undefined,
      email: auth.isAuthenticated().user.email || undefined,
      phone: user.phone || undefined,
      owner: auth.isAuthenticated().user.fname + ' ' + auth.isAuthenticated().user.lname || undefined,
    };
    create(car).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setOpen(true);
      }
    });
  };

  AddCar.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Car Register
          </Typography>

          <TextField
            id="model"
            label="Model"
            validationState="valid"
            validationText="Looks good!"
            className={classes.textField}
            value={values.model}
            onChange={handleChange("model")}
     
            margin="normal"
            required
          />
          <TextField
            id="description"
            label="Description"
            className={classes.textField}
            value={values.description}
            onChange={handleChange("description")}
            margin="normal"
          />
          <TextField
            id="year"
            label="Year"
            className={classes.textField}
            value={values.year}
            onChange={handleChange("year")}
            type="number"
            margin="normal"
          />
          <TextField
            id="seats"
            label="Seats"
            className={classes.textField}
            value={values.seats}
            onChange={handleChange("seats")}
            type="number"
            margin="normal"
          />
          <TextField
            id="transmission"
            label="Transmission"
            className={classes.textField}
            value={values.transmission}
            onChange={handleChange("transmission")}
            margin="normal"
          />
          <TextField
            id="fuelType"
            label="FuelType"
            className={classes.textField}
            value={values.fuelType}
            onChange={handleChange("fuelType")}
            margin="normal"
          />
          <TextField
            id="mileage"
            label="Mileage"
            className={classes.textField}
            value={values.mileage}
            onChange={handleChange("mileage")}
            margin="normal"
          />
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Register
          </Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Car Registered</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New car successfully registered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/AddCar">
            <Button
              color="primary"
              autoFocus
              variant="contained"
              onClick={handleClose}
            >
              Add Car
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
