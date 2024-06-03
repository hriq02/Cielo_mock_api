import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({ name: "recurrent" })
export class Recurrent{

    @PrimaryGeneratedColumn()
    id : number;

    // @OneToOne(() => Product)
    // @JoinColumn()
    // Prodcut : Product;

    @Column()
    interval : string;
    @Column()
    endDate : string;
}