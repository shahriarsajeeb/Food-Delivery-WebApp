import { gql, DocumentNode } from "@apollo/client";

export const CREATE_FOOD: DocumentNode = gql`
  mutation createFood($createFoodDto: CreateFoodDto!) {
    createFood(createFoodDto: $createFoodDto) {
      message
    }
  }
`;
