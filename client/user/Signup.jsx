import React, { useState } from "react";
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
import { create } from "./api-user";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 800,
    margin: "0 auto",
    marginTop: theme.spacing(5),
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
    width: "98%",
    height: 50,
    backgroundColor: "#5b9279", 
    color: "white",
    fontFamily: "Verdana",
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: 20,
    textAlign: "left",
    width: "48%"
  },
  signupTitle: {
    fontSize: 32,
    fontFamily: "Verdana"
  },
  signupSubTitle: {
    fontSize: 16,
    fontFamily: "Verdana",
    fontStyle: "italic",
    marginTop: theme.spacing(1),
  },
  halfTextField:
  {
    width: "48%",
    marginBottom: theme.spacing(2),
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));


export default function Signup() {
  const classes = useStyles();
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);
  
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    password: "",
    rePassword: "",
    email: "",
    phone: "",
    postal: ""
  });
  
  const [onSumbitEmpty, setSumbitEmpty] = useState({
    fname: false,
    lname: false,
    password: false,
    rePassword: false,
    email: false,
    phone: false,
    postal: false
  });

  const [open, setOpen] = useState(false);

  const handleChange = (name) => (event) => {
    if(name == "rePassword" || name == "password")
    {
      var correct = event.target.value == values.password;
      setIsPasswordIncorrect(!correct);
    }
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clickSubmit = () => {

    setSumbitEmpty({
      ...onSumbitEmpty,
      fname: values.fname == "", // Update the fname property to true
      lname: values.lname == "", // Update the lname property to false
      password: values.password == "", // Update the password property to true
      rePassword: values.rePassword == "", // Update the rePassword property to false
      email: values.email == "", // Update the email property to true
      phone: values.phone == "", // Update the phone property to false
      postal: values.postal == "" // Update the postal property to true
    });

    const user = {
      fname: values.fname || undefined,
      lname: values.lname || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      phone: values.phone || undefined,
      postal: values.postal || undefined,
    };

    if(values.fname && values.lname && values.password && values.rePassword && values.password == values.rePassword && values.email && values.phone && values.postal)
    {
      create(user).then((data) => {
        console.log(data);
        if (!data || data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setOpen(true);
        }
      });
    }
    
  };

  Signup.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.signupTitle}>
            Sign Up
          </Typography>
          <Typography className={classes.signupSubTitle}>
            Hey there, fill out this form
          </Typography>
          <div style={{ marginBottom: 50 }} />
          <div className={classes.row}>
          <TextField
            id="fname"
            label="Enter your first name"
            className={classes.halfTextField}
            value={values.fname}
            onChange={handleChange("fname")}
            margin="normal"
            variant="outlined"
            color="secondary"
            error={onSumbitEmpty.fname}
          /><TextField
            id="lname"
            label="Enter your last name"
            className={classes.halfTextField}
            value={values.lname}
            onChange={handleChange("lname")}
            margin="normal"
            variant="outlined"
            color="secondary"
            error={onSumbitEmpty.lname}
          />
          </div>
          
          <TextField
            id="password"
            label="Enter your password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
            type="password"
            variant="outlined"
            color="secondary"
            margin="normal"
            error={onSumbitEmpty.password}
          />
          <TextField
            id="confirm-password"
            label="Enter again your password"
            className={classes.textField}
            value={values.rePassword}
            onChange={handleChange("rePassword")}
            type="Password"
            variant="outlined"
            color="secondary"
            margin="normal"
            helperText={isPasswordIncorrect ? "Incorrect password" : ""}
            error={isPasswordIncorrect || onSumbitEmpty.password}
          />
          <TextField
            id="email"
            label="Enter your email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            variant="outlined"
            color="secondary"
            margin="normal"
            error={onSumbitEmpty.email}
          />
          <div className={classes.row}>
          <TextField
            id="phone"
            label="Enter your phone number"
            className={classes.halfTextField}
            value={values.phone}
            onChange={handleChange("phone")}
            margin="normal"
            type="Number"
            variant="outlined"
            color="secondary"
            error={onSumbitEmpty.phone}
          /><TextField
            id="postal"
            label="Enter your postal code"
            className={classes.halfTextField}
            value={values.postal}
            onChange={handleChange("postal")}
            margin="normal"
            variant="outlined"
            color="secondary"
            error={onSumbitEmpty.postal}
          />
          </div>
          
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/Signin">
            <Button
              color="primary"
              autoFocus
              variant="contained"
              onClick={handleClose}
            >
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
