import { Body, Controller, Get, HttpCode, Post, UseGuards } from "@nestjs/common";
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserLoginPayload } from './dto/user-login-payload.dto';
import * as bcrypt from 'bcryptjs';
import { UserAddPayload } from './dto/user-add-payload.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'test@test.com',
              description: 'user email address',
            },
            password: {
              type: 'string',
              example: 'test',
              description: 'user name',
            },
            role: {
              type: 'string',
              example: 'super_admin',
              description: 'user role',
            },
          },
        },
        token: {
          type: 'string',
          example: '123adfasdf1231231asdfasdfasd',
          description: 'user session token',
        },
      },
    },
    description: 'Success',
  })
  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  async login(@Body() input: UserLoginPayload) {
    const userDetails = await this.userService.findOneByEmail(input.email);
    userDetails.password = undefined;
    const response: any = {
      userDetails: userDetails,
      token: this.userService.getTokenForUser({
        email: userDetails.email,
        _id: userDetails['_id'],
      }),
    };
    return response;
  }

  @Post('/')
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          example: '123adfasdf1231231asdfasdfasd',
          description: 'user session token',
        },
        email: {
          type: 'string',
          example: 'test@test.com',
          description: 'user email address',
        },
      },
    },
    description: 'Success',
  })
  async add(@Body() input: UserAddPayload) {
    input.password = bcrypt.hashSync(input.password, 10);
    const response = await this.userService.create(input);
    response.password = undefined;
    return {
      message: 'User created successfully',
      data: response,
      status: 200,
    };
  }
}
