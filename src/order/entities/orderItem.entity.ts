import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "./order.entity";
import { Product } from "src/product/entities/product.entity";



@Table
export class OrderItem extends Model {
    @ForeignKey(()=>Order)
    @Column
    orderId: number

    @BelongsTo(()=>Order)
    order: Order

    @ForeignKey(()=>Product)
    @Column
    prouctId: number

    @BelongsTo(()=>Product)
    product: Product

    @Column
    price: number
    
    @Column
    quantity: number
}