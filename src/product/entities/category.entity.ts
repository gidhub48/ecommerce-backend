import { Column, Table, Model, PrimaryKey, AutoIncrement, ForeignKey, AllowNull } from "sequelize-typescript";

@Table
export class Category extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number

    @Column
    name: string

    @ForeignKey(()=>Category)
    @Column({
        
    })
    parent_id: string
}
