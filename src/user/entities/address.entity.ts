import { BelongsTo, Column, DataType, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.entity";


@Table
export class Address extends Model {
    @ForeignKey(() => User)
    @Column({
        allowNull: false,
    })
    userId: number;

    // Join
    @BelongsTo(() => User)
    user: User;

    @Column({
        allowNull: false,
    })
    fullName: string;

    @Column({
        allowNull: false,
    })
    phoneNumber: string;

    @Column({
        allowNull: false,
    })
    addressLine1: string;

    @Column
    addressLine2: string;

    @Column({
        allowNull: false,
    })
    city: string;

    @Column({
        allowNull: false,
    })
    state: string;

    @Column({
        allowNull: false,
    })
    postalCode: string;

    @Column({
        allowNull: false,
    })
    country: string;

    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    isDefault: boolean;
}