import { Field, InputType } from "@nestjs/graphql";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateFoodDto {
  @Field()
  @IsNotEmpty({ message: "Food Name is required." })
  @IsString({ message: "Food Name must need to be one string." })
  name: string;

  @Field()
  @IsNotEmpty({ message: "Food description is required." })
  @IsString({ message: "Food description must need to be one string." })
  description: string;

  @Field()
  @IsNotEmpty({ message: "Food price is required." })
  price: number;

  @Field()
  @IsNotEmpty({ message: "Food estimated price is required." })
  estimatedPrice: number;

  @Field()
  @IsNotEmpty({ message: "Food category is required." })
  @IsString({ message: "Food category must need to be one string." })
  category: string;

  @Field(() => [String])
  @IsArray({ message: "Food images must be an array." })
  @ArrayNotEmpty({ message: "Food images array must not be empty." })
  images: string[];
}

@InputType()
export class DeleteFoodDto {
  @Field()
  @IsNotEmpty({ message: "Food id is required." })
  @IsString({ message: "Food id must need to be one string." })
  id: string;
}
