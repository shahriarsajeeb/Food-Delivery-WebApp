import { gql, DocumentNode } from "@apollo/client";

export const GET_FOODS: DocumentNode = gql`
  query {
    getLoggedInRestaurantFoods {
      foods {
        id
        name
        description
        price
        images {
          public_id
          url
        }
        estimatedPrice
        category
        createdAt
        updatedAt
      }
    }
  }
`;
