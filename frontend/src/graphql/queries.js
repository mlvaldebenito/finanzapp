import { gql } from '@apollo/client';

// Query for all bank movements
export const GET_ALL_BANK_MOVEMENTS = gql`
  query GetAllBankMovements($startDate: Date, $endDate: Date) {
    allBankMovements(startDate: $startDate, endDate: $endDate) {
      id
      amount
      accountingDate
      observation
    }
  }
`;

// Query for count of distinct RUTs
export const GET_DISTINCT_RUTS_COUNT = gql`
  query getDistinctRutsCount($startDate: Date, $endDate: Date) {
    distinctRutsCount(startDate: $startDate, endDate: $endDate)
  }
`;


// Query for a single bank movement by ID
export const GET_BANK_MOVEMENT = gql`
  query GetBankMovement($id: Int!) {
    bankMovement(id: $id) {
      id
      amount
    }
  }
`;

// Query for all bank accounts
export const GET_ALL_BANK_ACCOUNTS = gql`
  query GetAllBankAccounts {
    allBankAccounts{
      id
      accountNumber
      bankName
    }
  }
`;

// Query for a single bank account by ID
export const GET_BANK_ACCOUNT = gql`
  query GetBankAccount($id: Int!) {
    bankAccount(id: $id) {
      id
      accountNumber
      bankName
    }
  }
`;

// Query for all banking credentials
export const GET_ALL_BANKING_CREDENTIALS = gql`
  query GetAllBankingCredentials {
    allBankingCredentials {
      id
      username
      bankName
    }
  }
`;

// Query for a single banking credential by ID
export const GET_BANKING_CREDENTIAL = gql`
  query GetBankingCredential($id: Int!) {
    bankingCredential(id: $id) {
      id
      username
      bankName
    }
  }
`;

// Query for all user details
export const GET_ALL_USER_DETAILS = gql`
  query GetAllUserDetails {
    allUserDetails {
      id
      rut
      user {
        id
        username
      }
    }
  }
`;

export const GET_USER_DETAIL = gql`
  query GetUserDetail($id: Int!) {
    userDetail(id: $id) {
      id
      rut
      user {
        id
        username
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser {
    getUser {
      id
      username
      hasBankCredentials
    }
  }
`;
