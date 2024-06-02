import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Recurrent{
    @PrimaryColumn() id: string;
    @Column() interval : string;
    @Column() end_date : string;
    @Column() amount : number;
    @Column() day : number;
    @Column() next_payment_date : string;

    public get_next_payment() : string{
        return "";
    }
}