import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { nanoid } from "nanoid";

@Entity({name: "shipping"})
export class Shipping{

    @PrimaryGeneratedColumn()
    shipping_id : number;

    @Column({
        type : "varchar",
        length : 8,
        nullable : true
    })
    public originZipCode : string;

    @Column({
        type : "varchar",
        length : 255,
        nullable : false
    })
    public type: string;

    @Column({
        type : "varchar",
        length : 128,
        nullable : false
    })
    public name : string;

    @Column({
        type : "integer",
        nullable : false
    })
    public price : number;


    @Column({
        type : "varchar",
        length : 32,
        nullable : true,
        default : nanoid(35).toLowerCase()
    })
    public checkout_cielo_order_number : string;
}