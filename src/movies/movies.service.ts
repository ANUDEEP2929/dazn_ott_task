import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Movies } from "./movies.schema";
import { Model } from "mongoose";
import { PaginatedResponseDto } from "./response/PaginatedResponseDto";

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movies.name) private movieModel: Model<Movies>) {}

  async create(createMovieDto: any): Promise<Movies> {
    const createdMovie = new this.movieModel(createMovieDto);
    return createdMovie.save();
  }

  async findAll(filter: any): Promise<Movies[]> {
    return this.movieModel.find(filter).exec();
  }

  async findOneById(id: string): Promise<Movies> {
    return this.movieModel.findOne({ _id: id });
  }

  async update(id: string, updateMovieDto: any): Promise<any> {
    return this.movieModel.updateOne({ _id: id }, updateMovieDto);
  }

  async deleteById(id: string): Promise<any> {
    return this.movieModel.deleteOne({ _id: id });
  }

  async getPaginatedList(
    page: number = 1,
    limit: number = 10,
    filter: any = {},
  ): Promise<PaginatedResponseDto<Movies>> {
    const skip = (page - 1) * limit;

    // Fetch data for the current page
    const data = await this.movieModel.find(filter).skip(skip).limit(limit).exec();

    // Count total rows
    const totalRows = await this.movieModel.countDocuments().exec();

    // Calculate total pages
    const totalPages = Math.ceil(totalRows / limit);

    return {
      docs: data,
      currentPage: page,
      totalRows,
      totalPages,
    };
  }
}
