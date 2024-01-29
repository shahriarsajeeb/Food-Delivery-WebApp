import { Field, ObjectType } from "@nestjs/graphql";
import { ErrorType } from "../../types/restaurant.type";
import { Foods } from "prisma/prisma-client";
import { Food } from "../entities/foods.entities";

@ObjectType()
export class CreateFoodResponse {
  @Field()
  message: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class LoggedInRestaurantFoodResponse {
  @Field(() => [Food], { nullable: true })
  foods: Foods;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class DeleteFoodResponse {
  @Field()
  message: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
