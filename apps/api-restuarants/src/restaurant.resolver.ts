import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { RestaurantService } from './restaurant.service';
import {
  ActivationResponse,
  LoginResponse,
  LogoutResposne,
  RegisterResponse,
} from './types/user.type';
import { ActivationDto, RegisterDto } from './dto/restaurant.dto';
import { Response, Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';

@Resolver('Restaurant')
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => RegisterResponse)
  async registerRestaurant(
    @Args('registerDto') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    const { message } = await this.restaurantService.registerRestaurant(
      registerDto,
      context.res,
    );
    return { message };
  }

  @Mutation(() => ActivationResponse)
  async activateRestaurant(
    @Args('activationDto') activationDto: ActivationDto,
    @Context() context: { res: Response },
  ): Promise<ActivationResponse> {
    return await this.restaurantService.activateRestaurant(
      activationDto,
      context.res,
    );
  }

  @Mutation(() => LoginResponse)
  async LoginRestaurant(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<LoginResponse> {
    return await this.restaurantService.LoginRestuarant({ email, password });
  }

  @Query(() => LoginResponse)
  @UseGuards(AuthGuard)
  async getLoggedInRestaurant(
    @Context() context: { req: Request },
  ): Promise<LoginResponse> {
    return await this.restaurantService.getLoggedInRestaurant(context.req);
  }

  @Query(() => LogoutResposne)
  @UseGuards(AuthGuard)
  async logOutRestaurant(@Context() context: { req: Request }) {
    return await this.restaurantService.Logout(context.req);
  }
}
