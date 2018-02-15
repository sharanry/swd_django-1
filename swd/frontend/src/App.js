import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, concat } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import Home from "./Routes/home/Home";
import AboutSWD from "./Routes/aboutSWD/AboutSWD";
import Layout from "./Components/Layout";
import logo from "./logo.svg";
import PropTypes from "prop-types";
import injectTapEventPlugin from "react-tap-event-plugin";

// react-tap-event-plugin provides onTouchTap() to all React Components.
// It's a mobile-friendly onClick() alternative for components in Material-UI,
// especially useful for the buttons.
injectTapEventPlugin();

const link = new HttpLink({
  uri: "http://localhost:8000/graphql",
  credentials: "same-origin"
});

const authMiddleware = new ApolloLink((operation, next) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `JWT ${localStorage.getItem("token") || null}`
    }
  }));

  return next(operation);
});

// networkInterface.use([
// {
//   applyBatchMiddleware(req, next) {
//     if (!req.options.headers) {
//       req.options.headers = {}How
//     }

//     const token = localStorage.getItem('token')
//       ? localStorage.getItem('token')
//       : null
//     req.options.headers['authorization'] = `JWT ${token}`
//     next()
//   },
// },
// ])

const client = new ApolloClient({
  link: concat(authMiddleware, link),
  cache: new InMemoryCache()
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Check if we're already logged in when starting the app.
      // However this is an offline method
      loggedIn: localStorage.getItem('token') ? true : false , 

      latestNews: [
        {
          title: "Winner of Aditya Birla Group scholarship 2017",
          link: "blah"
        },
        {
          title: "Important notice regarding MCN scholarship",
          link: "blah"
        }
      ]
    };


  }

  getChildContext() {
    return {loggedIn: this.state.loggedIn}
  }

  login = () => {
    this.setState({ loggedIn: true})
  }

  logout = () => {
    this.setState({ loggedIn: false})
  }

  render() {

    return (
      // apollo interfacing
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            {/* // Might need to add routing behaviour to take care of expired sessions */}
            <Route
              path="/aboutSWD"
              render={() => (
                <Layout isLoggedIn={this.state.loggedIn}>
                <AboutSWD/>
                </Layout>
              )}
            />
            <Route
              path="/"
              render={() => (
                <Layout isLoggedIn={this.state.loggedIn} login={this.login} logout={this.logout}>
                  <Home news={this.state.latestNews} />
                </Layout>
              )}
            /> 
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

App.childContextTypes = {
  loggedIn: PropTypes.bool
}

export default App;
