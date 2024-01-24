'use client';
import { gql, DocumentNode } from '@apollo/client';

export const LOGIN_RESTAURANT: DocumentNode = gql`
  mutation LoginRestaurant($email: String!, $password: String!) {
    LoginRestaurant(email: $email, password: $password) {
      restaurant {
        name
        country
        city
        address
        email
        password
        phone_number
      }
      accessToken
      refreshToken
      error {
        message
      }
    }
  }
`;
