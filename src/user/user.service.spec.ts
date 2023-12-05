import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.schema';
import { getSchemaPath } from '@nestjs/swagger';
import { getModelToken } from '@nestjs/mongoose';

describe('UserService', () => {
  let service: UserService;
  const jwtService = {
    sign: jest.fn(() => {
      return '1234567';
    }),
  };
  const mockUserModel = {
    save: jest.fn(() => {
      return {};
    }),
    get: jest.fn(() => {
      return {};
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service.create).toBeDefined();
  });
});
