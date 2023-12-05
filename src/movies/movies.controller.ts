import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieAddPayloadDto } from './dto/movies-add-payload.dto';
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('')
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'search',
          description: 'message',
        },
        status: {
          type: 'number',
          example: 200,
          description: 'status',
        },
        data: {
          type: 'object',
          properties: {
            docs: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: '123',
                    description: 'id',
                  },
                  title: {
                    type: 'string',
                    example: 'movie title',
                    description: 'title',
                  },
                  genre: {
                    type: 'string',
                    example: 'test',
                    description: 'genre',
                  },
                  rating: {
                    type: 'string',
                    example: '9',
                    description: 'movie rating',
                  },
                  streaming_link: {
                    type: 'string',
                    example: 'http://test.com/stream.mp`',
                    description: 'movie steaming link',
                  },
                },
              },
            },
            currentPage: {
              type: 'number',
              example: 1,
              description: 'current page',
            },
            totalRows: {
              type: 'number',
              example: 1,
              description: 'total rows',
            },
            totalPages: {
              type: 'number',
              example: 1,
              description: 'total pages',
            },
          },
        },
      },
    },
    description: 'Success',
  })
  async getMovies(@Query('q') search?: string) {
    let filter = {};
    if (search) {
      filter = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          {
            genre: { $regex: search, $options: 'i' },
          },
        ],
      };
    }
    const response = await this.moviesService.getPaginatedList(1, 10, filter);
    return { status: 200, message: 'paginated list', data: response };
  }

  @Get('/search')
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'search',
          description: 'message',
        },
        status: {
          type: 'number',
          example: 200,
          description: 'status',
        },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '123',
                description: 'id',
              },
              title: {
                type: 'string',
                example: 'movie title',
                description: 'title',
              },
              genre: {
                type: 'string',
                example: 'test',
                description: 'genre',
              },
              rating: {
                type: 'string',
                example: '9',
                description: 'movie rating',
              },
              streaming_link: {
                type: 'string',
                example: 'http://test.com/stream.mp`',
                description: 'movie steaming link',
              },
            },
          },
        },
      },
    },
    description: 'Success',
  })
  async searchMovies(@Query('q') search?: string) {
    let filter = {};
    if (search) {
      filter = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          {
            genre: { $regex: search, $options: 'i' },
          },
        ],
      };
    }
    const response = await this.moviesService.findAll(filter);
    return { status: 200, message: 'search', data: response };
  }

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('defaultBearerAuth')
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'search',
          description: 'message',
        },
        status: {
          type: 'number',
          example: 200,
          description: 'status',
        },
        data: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '123',
              description: 'id',
            },
            title: {
              type: 'string',
              example: 'movie title',
              description: 'title',
            },
            genre: {
              type: 'string',
              example: 'test',
              description: 'genre',
            },
            rating: {
              type: 'string',
              example: '9',
              description: 'movie rating',
            },
            streaming_link: {
              type: 'string',
              example: 'http://test.com/stream.mp`',
              description: 'movie steaming link',
            },
          },
        },
      },
    },
    description: 'Success',
  })
  async createMovie(@Body() body: MovieAddPayloadDto) {
    const response = await this.moviesService.create(body);
    return { status: 201, message: 'created', data: response };
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          example: '123',
          description: 'id',
        },
        title: {
          type: 'string',
          example: 'movie title',
          description: 'title',
        },
        genre: {
          type: 'string',
          example: 'test',
          description: 'genre',
        },
        rating: {
          type: 'string',
          example: '9',
          description: 'movie rating',
        },
        streaming_link: {
          type: 'string',
          example: 'http://test.com/stream.mp`',
          description: 'movie steaming link',
        },
      },
    },
    description: 'Success',
  })
  async getMovie(@Param('id') id: string) {
    const response = await this.moviesService.findOneById(id);
    if (!response) {
      throw new HttpException('Movie Not Found', HttpStatus.NOT_FOUND);
    } else {
      return { status: 201, message: 'details', data: response };
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('defaultBearerAuth')
  async deleteMovie(@Param('id') id: string) {
    const response = await this.moviesService.deleteById(id);
    return { status: 201, message: 'deleted', data: response };
  }

  @Put('/:id')
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(AuthGuard('jwt'))
  async updateMovie(@Param('id') id: string, @Body() body: MovieAddPayloadDto) {
    const response = await this.moviesService.update(id, body);
    return { status: 200, message: 'edited', data: response };
  }
}
