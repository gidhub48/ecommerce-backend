import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "src/product/entities/product.entity";
import { Cart } from "./cart.entity";


@Table
export class CartItem extends Model {
    @ForeignKey(()=>Cart)
    @Column
    cartId: number

    @ForeignKey(()=>Product)
    @Column
    productId: number

    @Column
    quantity: number
}