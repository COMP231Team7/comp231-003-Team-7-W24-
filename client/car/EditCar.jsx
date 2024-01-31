import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import auth from "../lib/auth-helper.js";
import { read, update } from "./api-car.js";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
  },
  error: {
    verticalAlign: "middle",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

export default function EditCar({ match }) {
  const classes = useStyles();
  const { carId } = useParams();
  const [values, setValues] = useState({
    model: "",
    description: "",
    year: 0,
    seats: 0,
    transmission: "",
    fuelType: "",
    mileage: "",
    redirectToList: false
  });
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read(
      {
        carId: carId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          model: data.model,
          description: data.description,
          year: data.year,
          seats: data.seats,
          transmission: data.transmission,
          fuelType: data.fuelType,
          mileage: data.mileage
        });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [carId]);

  const clickSubmit = () => {
    const car = {
      model: values.model || undefined,
      description: values.description || undefined,
      year: values.year || undefined,
      seats: values.seats || undefined,
      transmission: values.transmission || undefined,
      fuelType: values.fuelType || undefined,
      mileage: values.mileage || undefined,
    };
    update(
      {
        carId: carId,
      },
      {
        t: jwt.token,
      },
      car
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          model: data.model,
          description: data.description,
          year: data.year,
          seats: data.seats,
          transmission: data.transmission,
          fuelType: data.fuelType,
          mileage: data.mileage,
          redirectToList: true
        });
      }
    });
  };
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  if (values.redirectToList) {
    return <Navigate to={"/listCar"} />;
  }
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Edit Car Details
          </Typography>

          <TextField
            id="model"
            label="Model"
            className={classes.textField}
            value={values.model}
            onChange={handleChange("model")}
            margin="normal"
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
            Update
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
