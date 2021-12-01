import {Films} from "./Films";

require('dotenv').config();
import {Field, ObjectType} from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { EncryptionTransformer } from 'typeorm-encrypted';


@ObjectType()
@Entity()
export class User extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id!: number

    @Field()
    @Column({ unique: true })
    username!: string;


    @Column({transformer: new EncryptionTransformer({
            key: process.env.KEY as string,
            algorithm: 'aes-256-cbc',
            ivLength: 16,
            iv: process.env.IV
        })})
    password!: string;

    @Field (()=>Films)
    @OneToMany(()=>Films, film=>film.creator)
    films:Films[]

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date;

}