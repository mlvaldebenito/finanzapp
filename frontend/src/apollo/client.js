import { createUploadLink } from "apollo-upload-client";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_BACKEND_URI || 'http://localhost:8000/graphql',
});
// HTTP link to the GraphQL server

// Middleware to attach the Authorization header
const authLink = setContext((_, { headers }) => {
  // Retrieve the token from localStorage or another storage mechanism
  const token = localStorage.getItem('refreshToken'); // Or use a reactive variable if you prefer
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '', // Add the token to the Authorization header
    },
  };
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
        && definition.operation === 'subscription'
    );
  },
  authLink.concat(uploadLink),
);
// Combine authLink with httpLink
const client = new ApolloClient({
  link: splitLink, // Attach authLink before making requests
  cache: new InMemoryCache(),
});

export default client;
