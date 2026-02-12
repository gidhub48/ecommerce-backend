import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";

@Table
export class Cart extends Model{
    @ForeignKey(()=>User)
    @Column
    user_id: number
}
