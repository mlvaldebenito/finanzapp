import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_URI || 'http://localhost:8000/graphql', // Replace with your GraphQL endpoint
});

// Middleware to attach the Authorization header
const authLink = setContext((_, { headers }) => {
  // Retrieve the token from localStorage or another storage mechanism
  const token = localStorage.getItem('refreshToken'); // Or use a reactive variable if you prefer
  console.log("TOKENNNN", token)
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '', // Add the token to the Authorization header
    },
  };
});

// Combine authLink with httpLink
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Attach authLink before making requests
  cache: new InMemoryCache(),
});

export default client;
