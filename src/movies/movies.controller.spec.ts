import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesController', () => {
  let controller: MoviesController;
  const movieService = {
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
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: movieService,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller.createMovie).toBeDefined();
  });
});
