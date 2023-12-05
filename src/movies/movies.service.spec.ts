import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Movies } from "./movies.schema";
import { getModelToken } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";

describe('MoviesService', () => {
  let service: MoviesService;
  const jwtService = {
    sign: jest.fn(() => {
      return '1234567';
    }),
  };
  const mockMoviesModel = {
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
        MoviesService,
        {
          provide: getModelToken(Movies.name),
          useValue: mockMoviesModel,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service.create).toBeDefined();
  });
});
