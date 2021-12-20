import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { getConnection, SelectQueryBuilder } from 'typeorm';
import { Films } from '../entities/Films';
import { CreateFilmInput } from '../inputs/createFilmInput';
import { FilmResponse, FilmResponsePagination } from '../types/film.types';
import { MyCtx } from '../types/myCtx';
import { isAuth } from '../middleware/isAuth';
import { User } from '../entities/User';

@Resolver()
export class FilmsResolver {
  async getFilmsUserJoint(): Promise<SelectQueryBuilder<Films>> {
    return getConnection()
      .getRepository(Films)
      .createQueryBuilder('f')
      .leftJoinAndSelect('f.user', 'user');
  }

  @Query(() => [Films])
  async getAllFilms(): Promise<Films[]> {
    try {
      const db = await this.getFilmsUserJoint();
      return db.getMany();
    } catch (error) {
      throw new Error('Something went wrong!');
    }
  }

  @Query(() => FilmResponsePagination)
  async getFilmsByCreationDate(
    @Arg('limit') limit: number,
    @Arg('cursor', () => Number, { nullable: true }) cursor: number | 0
  ): Promise<FilmResponsePagination> {
    const getLimit = Math.min(50, limit);
    const gdb = await this.getFilmsUserJoint();
    const films = await gdb
      .orderBy('f.createdAt', 'DESC')
      .take(getLimit + 1)
      .skip((cursor - 1) * getLimit)
      .getMany();
    return {
      films: films.slice(0, getLimit),
      hasMore: films.length - 1 === getLimit,
    };
  }

  @Query(() => FilmResponse)
  async getFilmById(@Arg('id') id: number): Promise<FilmResponse> {
    const db = await this.getFilmsUserJoint();
    const film = await db.where(`f.id=${id}`).getOne();
    if (!film) {
      return {
        errors: [
          {
            field: 'Films',
            message: "The ID provided doesn't exist",
          },
        ],
      };
    }
    return { film };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteFilm(@Arg('id') id: number):Promise<boolean> {
    try {
      await Films.delete({ id });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Mutation(() => FilmResponse)
  @UseMiddleware(isAuth)
  async addFilm(
    @Arg('data') data: CreateFilmInput,
    @Ctx() { req }: MyCtx
  ): Promise<FilmResponse> {
    const user = await User.findOne({
      where: `user.id= ${req.session.userID}`,
    });
    const film = Films.create({
      ...data,
      creatorUID: req.session.userID,
      user,
    });
    try {
      await film.save();
      return { film };
    } catch (error) {
      return {
        errors: [
          {
            field: 'Film Creation',
            message: error.message,
          },
        ],
      };
    }
  }
}
