import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from '@apollo/client/react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const REACT_APP_GRAPHQL_ENDPOINT =
  "https://api.thegraph.com/subgraphs/name/enemycnt/argent-guardians-beta";

const client = new ApolloClient({
  uri: REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
