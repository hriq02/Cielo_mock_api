import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({ name: "recurrent" })
export class Recurrent_model{

    @PrimaryGeneratedColumn()
    id : number;
    @OneToOne(() => Product)
    Prodcut : Product
    @Column()
    recurrent : string;
    @Column()
    end_date : string;
}