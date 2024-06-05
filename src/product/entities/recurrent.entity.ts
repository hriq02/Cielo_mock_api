import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({ name: "recurrent" })
export class Recurrent{

    @PrimaryGeneratedColumn()
    recurrent_id : number;

    // @OneToOne(() => Product)
    // @JoinColumn()
    // Prodcut : Product;

    @Column({
        type : "char",
        length : 128,
        nullable : true
    })
    interval : string;

    @Column({
        type : "char",
        length : 20,
        nullable : true
    })
    endDate : string;
}