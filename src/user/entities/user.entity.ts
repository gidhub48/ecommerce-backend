import { Column, Table, Model, ForeignKey, HasMany, DataType } from "sequelize-typescript";
import { Address } from "./address.entity";

type Role = "User" | "Admin"

@Table
export class User extends Model {

    @Column
    declare name: string

    @Column({
        unique: true
    })
    declare email: string

    @Column
    declare password: string

    @Column
    declare imageUrl: string

    @Column({
        type: DataType.ENUM("User", "Admin"),
        defaultValue: "User"
    })
    declare role: Role

    @HasMany(()=>Address)
    declare address: Address

}
