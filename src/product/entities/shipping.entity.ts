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
        type : "char",
        length : 8,
        nullable : false
    })
    public originZipCode : string;

    @Column({
        type : "char",
        length : 255,
        nullable : false
    })
    public type: string;

    @Column({
        type : "char",
        length : 128,
        nullable : false
    })
    public name : string;

    @Column({
        type : "integer",
        length : 100000,
        nullable : false
    })
    public price : number;
}