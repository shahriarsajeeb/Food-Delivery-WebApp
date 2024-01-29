"use client";

import { gql, DocumentNode } from "@apollo/client";

export const DELETE_FOOD: DocumentNode = gql`
  mutation DeleteFood($id: String!) {
    deleteFood(deleteFoodDto: { id: $id }) {
      message
    }
  }
`;
