import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field()
  @IsNotEmpty({ message: 'Restaurant Name is required.' })
  @IsString({ message: 'Restaurant Name must need to be one string.' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Restaurant country is required.' })
  @IsString({ message: 'Restaurant country must need to be one string.' })
  country: string;

  @Field()
  @IsNotEmpty({ message: 'Restaurant city is required.' })
  @IsString({ message: 'Restaurant city must need to be one string.' })
  city: string;

  @Field()
  @IsNotEmpty({ message: 'Restaurant city is required.' })
  @IsString({ message: 'Restaurant city must need to be one string.' })
  address: string;

  @Field()
  @IsNotEmpty({ message: 'Restaurant Email is required.' })
  @IsEmail({}, { message: 'Restaurant Email is invalid.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Restaurant Phone Number is required.' })
  phone_number: number;

  @Field()
  @IsNotEmpty({ message: 'Restaurant Password is required.' })
  @MinLength(8, {
    message: 'Restaurant Password must be at least 8 characters.',
  })
  password: string;
}


@InputType()
export class ActivationDto {
  @Field()
  @IsNotEmpty({ message: 'Activation Token is required.' })
  activationToken: string;
}

@InputType()
export class LoginDto {
  @Field()
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email must be valid.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
}
