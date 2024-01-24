'use client';
import { gql, DocumentNode } from '@apollo/client';

export const REGISTER_RESTAURANT: DocumentNode = gql`
  mutation registerRestaurant(
    $name: String!
    $country: String!
    $city: String!
    $address: String!
    $email: String!
    $phone_number: Float!
    $password: String!
  ) {
    registerRestaurant(
      registerDto: {
        name: $name
        country: $country
        city: $city
        address: $address
        email: $email
        password: $password
        phone_number: $phone_number
      }
    ) {
      message
    }
  }
`;
