import { Column, Table, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Category } from "src/product/entities/category.entity";


@Table
export class Product extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number

    @Column
    name: string

    @Column
    description: string

    @Column
    price: number

    @Column
    stock: number

    @ForeignKey(()=>Category)
    @Column
    category_id: number

    @BelongsTo(()=>Category)
    category: Category

    @Column
    is_active: boolean


}
