import gql from 'graphql-tag'

export const LOGIN = gql`
  mutation Login($email: String!, $password: String, $googleId: String) {
    login(email: $email, password: $password, googleId: $googleId) {
      email
      jwt
      id
    }
  }
`
