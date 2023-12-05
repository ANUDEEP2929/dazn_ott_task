import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { LocalStrategy } from '../src/user/strategies/local.strategy';
import { UserService } from '../src/user/user.service';
import { ConfigModule } from '@nestjs/config';
import { UserLoginPayload } from 'src/user/dto/user-login-payload.dto';
import { MongooseModule } from '@nestjs/mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.e2etesting`,
        }),
        MongooseModule.forRoot('mongodb://localhost:27018/dazn'),
      ],
      providers: [
        {
          provide: LocalStrategy,
          useValue: LocalStrategy,
        },
        {
          provide: UserService,
          useValue: UserService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ping (GET)', () => {
    return request(app.getHttpServer())
      .get('/ping')
      .expect(200)
      .expect('Hello World!');
  });

  it('/user/login (POST)', () => {
    const userLoginPayload: UserLoginPayload = {
      email: 'test@gmail.com',
      password: '123551',
    };
    return request(app.getHttpServer())
      .post('/user/login')
      .set('Accept', 'application/json')
      .send(userLoginPayload)
      .expect(200)
      .then((response) => {
        const responseData = response.body;
        expect(responseData).toHaveProperty('token');
        delete responseData.token;
        expect(response.body).toEqual({
          userDetails: {
            _id: '656f7d77eb0e682cca187c13',
            email: 'test@gmail.com',
            __v: 0,
          },
        });
      });
  });
});
