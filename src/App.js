import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import i18n from "./i18n";

import TranslateIcon from "@material-ui/icons/Translate";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import ProductListPage from "./pages/ProductListPage";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const { t, lang } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    // navigate("/products");
  };

  return (
    <Router>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {t("app.title")}
          </Typography>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <TranslateIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleLanguageChange("en")}>
              {t("menu.english")}
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange("ar")}>
              {t("menu.arabic")}
            </MenuItem>
          </Menu>
          {window.location.href.includes("/products") && (
            <Button
              color="inherit"
            >
              {t("button.logout")}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Routes>
        <Route exact path="/products" element={<ProductListPage />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
  );
}

export default App;
