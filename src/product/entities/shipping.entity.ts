import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({name: "shipping"})
export class Shipping_model{

    @PrimaryGeneratedColumn()
    id : number;

    @OneToOne(() => Product)
    Prodcut : Product

    @Column()
    public type: string;

    @Column()
    public name : string;

    @Column()
    public price : number;
}