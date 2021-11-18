import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Films} from "../entities/Films";
import {CreateFilmInput} from "../inputs/createFilmInput";
import {FilmResponse} from "../types/film.types";
import {getRepository} from "typeorm";

@Resolver()
export class FilmsResolver{
    @Query(()=>FilmResponse)
    getAllFilms(){
        return getRepository(Films).find();
    }

    @Mutation(()=>FilmResponse)
    async addFilm(@Arg("data") data:CreateFilmInput):Promise<FilmResponse>{
        const film = Films.create(data)
        try{
            await film.save()
            return {film}
        } catch (error){
           return  {
               errors:[{
                   field: 'Film Creation',
                   message: error.message
               }]
           }
        }

    }
}