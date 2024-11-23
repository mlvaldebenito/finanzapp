import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      user {
        id
        email
      }
    }
  }
`;

export const TOKEN_AUTH = gql`
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(username: $email, password: $password) {
      token
    }
  }
`;


// refreshToken mutation
export const REFRESH_TOKEN = gql`
    mutation RefreshToken($token: String!) {
        refreshToken(token: $token) {
        token
        }
    }
    `;

// verifyToken mutation
export const VERIFY_TOKEN = gql`
    mutation VerifyToken($token: String!) {
        verifyToken(token: $token) {
        payload
        }
    }
    `;