'use client';
import { gql, DocumentNode } from '@apollo/client';

export const ACTIVATION_RESTAURANT: DocumentNode = gql`
  mutation activateRestaurant($activationToken: String!) {
    activateRestaurant(activationDto: { activationToken: $activationToken }) {
      restaurant {
        name
        country
        city
        address
        email
        password
        phone_number
      }
    }
  }
`;
