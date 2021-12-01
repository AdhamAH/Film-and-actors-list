import {Arg, Ctx, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import {Films} from "../entities/Films";
import {CreateFilmInput} from "../inputs/createFilmInput";
import {FilmResponse} from "../types/film.types";
import {MyCtx} from "../types/myCtx";
import {isAuth} from "../middleware/isAuth";
import {getConnection} from "typeorm";

@Resolver()
export class FilmsResolver {
    @Query(() => [Films])
    async getAllFilms(): Promise<Films[]> {
        try {
            return Films.find()
        } catch (error) {
            throw new Error("Something went wrong!")
        }


    }

    @Query(() => [Films])
    async getFilmsByCreationDate(
        @Arg("limit") limit: number,
      //  @Arg('cursor', () => String, {nullable: true}) cursor: string | null
    ): Promise<Films[]> {
        const getLimit = Math.min(50, limit)
        return await getConnection().getRepository(Films).createQueryBuilder('films').
        orderBy("createdAt", 'DESC').take(getLimit).getMany()
    }

    @Query(() => FilmResponse)
    async getFilmById(@Arg("id") id: number): Promise<FilmResponse> {
        const film = await Films.findOne({where: {id}});
        if (!film) {
            return {
                errors: [{
                    field: 'Films',
                    message: "The ID provided doesn't exist"
                }
                ]
            }
        } else {
            return {film}
        }
    }

    @Mutation(() => FilmResponse)
    @UseMiddleware(isAuth)
    async addFilm(@Arg("data") data: CreateFilmInput,
                  @Ctx() {req}: MyCtx): Promise<FilmResponse> {
        const film = Films.create({...data, creatorUID: req.session.userID,})
        try {
            await film.save()
            return {film}
        } catch (error) {
            return {
                errors: [{
                    field: 'Film Creation',
                    message: error.message
                }]
            }
        }

    }
}