import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SignInPage } from "./signin";
import { SignUpPage } from "./signup";

// TODO: Add image
export const LandingPage: React.FC = () => {
  return (
    <Router>
      <Typography variant="h1">PAM</Typography>
      <Typography variant="subtitle1">movie recommendations</Typography>
      <Container>
        <Link to="/signin">
          <Button fullWidth={true}>Log in</Button>
        </Link>
        <Link to="/signup">
          <Button fullWidth={true}>Sign Up</Button>
        </Link>
      </Container>
      <Switch>
        <Route path="/signin">
          <SignInPage />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
      </Switch>
    </Router>
  );
};
