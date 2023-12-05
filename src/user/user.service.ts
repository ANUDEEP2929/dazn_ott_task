import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(user: any): Promise<User> {
    const userDb = new this.userModel(user);
    return userDb.save();
  }

  async findAll(filter: any): Promise<User[]> {
    return this.userModel.find(filter).exec();
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  async update(id: string, updateMovieDto: any): Promise<any> {
    return this.userModel.updateOne({ _id: id }, updateMovieDto);
  }

  public getTokenForUser(user: any): string {
    return this.jwtService.sign(user);
  }
}
