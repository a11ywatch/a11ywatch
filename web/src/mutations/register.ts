import gql from 'graphql-tag'

export const REGISTER = gql`
  mutation Register($email: String!, $password: String, $googleId: String) {
    register(email: $email, password: $password, googleId: $googleId) {
      email
      jwt
      id
    }
  }
`
