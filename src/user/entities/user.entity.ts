import { Column, Table, Model, PrimaryKey, AutoIncrement, BelongsTo } from "sequelize-typescript";
import { Address } from "./address.entity";

export type Role = 'User' | 'Admin'

@Table
export class User extends Model {

    @Column
    name: string

    @Column
    email: string

    @Column
    password: string

    @Column
    imageUrl: string

    @Column
    role: Role

    @BelongsTo(()=>Address)
    address: Address

}
