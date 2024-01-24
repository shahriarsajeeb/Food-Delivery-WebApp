import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email/email.service';
import { ActivationDto, LoginDto, RegisterDto } from './dto/restaurant.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { TokenSender } from './utils/send.token';

interface Restaurant {
  name: string;
  country: string;
  city: string;
  address: string;
  email: string;
  phone_number: number;
  password: string;
}

@Injectable()
export class RestaurantService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  // register restaurant service
  async registerRestaurant(registerDto: RegisterDto, response: Response) {
    const { name, country, city, address, email, phone_number, password } =
      registerDto as Restaurant;

    const isEmailExist = await this.prisma.restaurant.findUnique({
      where: {
        email,
      },
    });
    if (isEmailExist) {
      throw new BadRequestException(
        'Restaurant already exist with this email!',
      );
    }

    const usersWithPhoneNumber = await this.prisma.restaurant.findUnique({
      where: {
        phone_number,
      },
    });

    if (usersWithPhoneNumber) {
      throw new BadRequestException(
        'Restaurant already exist with this phone number!',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const restaurant: Restaurant = {
      name,
      country,
      city,
      address,
      email,
      phone_number,
      password: hashedPassword,
    };

    const activationToken = await this.createActivationToken(restaurant);

    const client_side_uri = this.configService.get<string>('CLIENT_SIDE_URI');

    const activation_token = `${client_side_uri}/activate-account/${activationToken}`;

    await this.emailService.sendMail({
      email,
      subject: 'Activate your restaurant account!',
      template: './activation-mail',
      name,
      activation_token,
    });

    return {
      message: 'Please check your email to activate your account',
      response,
    };
  }

  // create activation token
  async createActivationToken(restaurant: Restaurant) {
    const activationToken = this.jwtService.sign(
      {
        restaurant,
      },
      {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
        expiresIn: '5m',
      },
    );
    return activationToken;
  }

  // activation restaurant
  async activateRestaurant(activationDto: ActivationDto, response: Response) {
    const { activationToken } = activationDto;

    const newRestaurant: {
      exp: number;
      restaurant: Restaurant;
      activationToken: string;
    } = this.jwtService.verify(activationToken, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    } as JwtVerifyOptions);

    if (newRestaurant?.exp * 1000 < Date.now()) {
      throw new BadRequestException('Invalid activation code');
    }

    const { name, country, city, phone_number, password, email, address } =
      newRestaurant.restaurant;

    const existRestaurant = await this.prisma.restaurant.findUnique({
      where: {
        email,
      },
    });

    if (existRestaurant) {
      throw new BadRequestException(
        'Restaurant already exist with this email!',
      );
    }

    const restaurant = await this.prisma.restaurant.create({
      data: {
        name,
        email,
        address,
        country,
        city,
        phone_number,
        password,
      },
    });

    return { restaurant, response };
  }

  // Login restaurant
  async LoginRestuarant(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        email,
      },
    });

    if (
      restaurant &&
      (await this.comparePassword(password, restaurant.password))
    ) {
      const tokenSender = new TokenSender(this.configService, this.jwtService);
      return tokenSender.sendToken(restaurant);
    } else {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        error: {
          message: 'Invalid email or password',
        },
      };
    }
  }

  // compare with hashed password
  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // get logged in restaurant
  async getLoggedInRestaurant(req: any) {
    const restaurant = req.restaurant;
    const refreshToken = req.refreshtoken;
    const accessToken = req.accesstoken;
    return { restaurant, accessToken, refreshToken };
  }

  // log out restaurant
  async Logout(req: any) {
    req.restaurant = null;
    req.refreshtoken = null;
    req.accesstoken = null;
    return { message: 'Logged out successfully!' };
  }
}
