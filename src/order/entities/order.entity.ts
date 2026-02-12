import { Column, Table, Model, PrimaryKey, AutoIncrement, ForeignKey } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";

@Table
export class Order extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number

    @ForeignKey(()=>User)
    @Column
    user_id: number

    @Column
    total_price: number

    @Column
    status: number

    @Column
    created_at: number
}
