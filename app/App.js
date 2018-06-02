import React from 'react';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import { StackNavigator } from 'react-navigation';
import RootStack from './navigation';

const httpLink = new HttpLink({uri: 'http://192.168.1.37:4100/graphql'});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <RootStack />
      </ApolloProvider>
    );
  }
}
