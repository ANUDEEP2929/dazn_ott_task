import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ValidationError, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UserLoginPayload } from './dto/user-login-payload.dto';
import { NotFoundException } from '@nestjs/common';
describe('User Login Functionality', () => {
  let controller: UserController;
  let userMockService: UserService;
  const loginValidPayload = {
    email: 'anudeep@gmail.com',
    password: '123456',
  };
  const loginInvalidEmailPayload = {
    email: 'asdfasdfasdf',
    password: '123123123',
  };
  const loginInvalidPasswordPayload = {
    email: 'anudeep@gmail.com',
    password: '123',
  };
  const userService = {
    create: jest.fn((input: any) => {
      return {
        id: 1,
        ...input,
      };
    }),
    findOneByEmail: jest.fn((email: string) => {
      if (email === 'anudeep@gmail.com') {
        return {
          id: 1,
          email: 'anudeep@gmail.com',
          name: 'anudeep',
        };
      } else {
        throw new NotFoundException('User not found');
      }
    }),
    getTokenForUser: jest.fn(() => {
      return '123456';
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compile();
    controller = module.get<UserController>(UserController);
    userMockService = module.get<UserService>(UserService);
  });
  it('should be defined login function', async () => {
    expect(await controller.login).toBeDefined();
  });
  it('Should check Email Required Validation', async () => {
    const ofImportDto = plainToInstance(UserLoginPayload, {
      password: '1234565',
    });
    const errors = await validate(ofImportDto);
    expect(stringified(errors)).toContain(`Email is Required`);
  });
  it('Should Check Invalid EMAIL format', async () => {
    const ofImportDto = plainToInstance(
      UserLoginPayload,
      loginInvalidEmailPayload,
    );
    const errors = await validate(ofImportDto);
    expect(stringified(errors)).toContain(`Email is not valid`);
  });
  it('Should check Password Required Validation', async () => {
    const ofImportDto = plainToInstance(UserLoginPayload, {
      email: 'test@gmail.com',
    });
    const errors = await validate(ofImportDto);
    expect(stringified(errors)).toContain(`Password is Required`);
  });
  it('Should Check Invalid PASSWORD format', async () => {
    const ofImportDto = plainToInstance(
      UserLoginPayload,
      loginInvalidPasswordPayload,
    );
    const errors = await validate(ofImportDto);
    expect(stringified(errors)).toContain(
      `Password length Must be between 6 and 50 charcters`,
    );
  });
  it('Login Funciton need to call getUserByEmail service Function', async () => {
    const expectedResponse: any = {
      userDetails: {
        id: 1,
        email: 'anudeep@gmail.com',
        name: 'anudeep',
      },
      token: '123456',
    };
    expect(await controller.login(loginValidPayload)).toEqual(expectedResponse);
    expect(userMockService.findOneByEmail).toBeCalled();
  });
  it('Should return not found error', async () => {
    try {
      expect(
        await controller.login({
          email: 'anudeep@test.com',
          password: '12312312312',
        }),
      ).toEqual({});
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('User not found');
    }
  });
  it('should return success', async () => {
    const expectedResponse: any = {
      userDetails: {
        id: 1,
        email: 'anudeep@gmail.com',
        name: 'anudeep',
      },
      token: '123456',
    };
    expect(await controller.login(loginValidPayload)).toEqual(expectedResponse);
  });
});
function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors);
}
