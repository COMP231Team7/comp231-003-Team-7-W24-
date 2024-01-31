import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import auth from './auth-helper.js'
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { signin } from './api-auth.js'
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 800,
    margin: "0 auto",
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#f8f8ff"
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
    
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  signinTitle: {
    fontSize: 32,
    fontFamily: "Verdana",
    
  },
  signinSubTitle: {
    fontSize: 16,
    fontFamily: "Verdana",
    marginTop: theme.spacing(1),
    fontStyle: "italic",
    
  },
  goToSignupText: {
    fontSize: 12,
    fontFamily: "Verdana",
    
  },
  submit: {
    margin: "0 auto",
    width: "80%",
    height: 50,
    backgroundColor: "#5b9279",
    color: "white",
    fontFamily: "Verdana",
    marginBottom: theme.spacing(2),
  },
  
}))

export default function Signin(props) {
  const location = useLocation();
  console.log(location.state)
  const classes = useStyles()
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false
  })

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    }
    console.log(user)
    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        console.log(data)
        auth.authenticate(data, () => {
          setValues({ ...values, error: '', redirectToReferrer: true })
        })
      }
    })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const { from } = location.state || {
    from: {
      pathname: '/'
    }
  }
  const { redirectToReferrer } = values
  if (redirectToReferrer) {
    return <Navigate to={from} />;

  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.signinSubTitle}>
          <h1>Welcome Back!</h1>
     Login to your account to view today's Car!
        </Typography>
        <TextField id="email"
          type="email"
          label="Email"
          className={classes.textField}
          value={values.email}
          onChange={handleChange('email')}
          color="secondary"
          margin="normal" />
        <TextField id="password"
          type="password"
          label="Password"
          className={classes.textField}
          value={values.password}
          onChange={handleChange('password')}
          color="secondary"
          margin="normal" />
        <br /> {
          values.error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
            {values.error}
          </Typography>)
        }
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>LOGIN</Button>
      </CardActions>
      <Typography className={classes.goToSignupText} component={Link} to="/signup">
          Don't have a account yet? Click here to sign up!
        </Typography>
    </Card>

    
  )
}
