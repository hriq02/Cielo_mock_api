import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({name: "shipping"})
export class Shipping{

    @PrimaryGeneratedColumn()
    shipping_id : number;

    // @OneToOne(() => Product)
    // @JoinColumn()
    // Prodcut : Product;

    @Column()
    public type: string;

    @Column()
    public name : string;

    @Column()
    public price : number;
}