import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Launches from './containers/Launches/Launches';
import Launch from './containers/Launch/Launch';

import './App.css';

const client = new ApolloClient({
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Route exact path="/" component={Launches} />
          <Route exact path="/launches/:id" component={Launch} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
