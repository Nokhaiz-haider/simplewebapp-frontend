import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  IconButton,
  Typography,
  Card,
  CardContent,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5", // Grey background color
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    maxWidth: 400,
    margin: "0 auto",
    marginTop: "-100px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "red",
    textAlign: "center",
  },
}));

const SignupForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to the backend endpoint
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`,
        {
          username,
          email,
          password,
        }
      );
      if (response.status === 200) {
        console.log(response.data.user);
        navigate("/products", { state: response.data.user });
      } else if (response.status === 409) {
        // Email already exists
        setError("Failed! Username is already in use!");
      } else {
        setError("An error occurred during login");
      }
    } catch (error) {
      setError(`Error during signup: ${error.response.data.message}`);
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Card className={classes.card}>
          <CardContent>
            <IconButton component={Link} to="/" className={classes.backButton}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" align="center" gutterBottom>
              {t("signup.title")}
            </Typography>
            <form className={classes.form} onSubmit={handleSignup}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label={t("signup.usernameLabel")}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label={t("login.emailLabel")}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label={t("login.passwordLabel")}
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              {error && (
                <Typography variant="body2" className={classes.error}>
                  {t(error)}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {t("signup.buttonLabel")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default SignupForm;
