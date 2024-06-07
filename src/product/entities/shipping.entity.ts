import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({name: "shipping"})
export class Shipping{

    @PrimaryGeneratedColumn()
    shipping_id : number;

    // @OneToOne(() => Product)
    // @JoinColumn()
    // Prodcut : Product;

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
}