import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "src/order/entities/order.entity";


@Table
export class Payment extends Model {
    @ForeignKey(()=>Order)
    @Column
    orderId: number
    @Column
    status: string
    @Column
    provider: string
}
