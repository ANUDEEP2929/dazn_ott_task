import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movies, MoviesSchema } from './movies.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '../user/strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.AUTH_SECRET || '1234556',
        signOptions: {
          expiresIn: '60m',
        },
      }),
    }),
    MongooseModule.forFeature([
      { name: Movies.name, schema: MoviesSchema },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    UserModule,
  ],
  providers: [MoviesService, JwtStrategy, UserService],
  controllers: [MoviesController],
})
export class MoviesModule {}
