import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity({ name: "recurrent" })
export class Recurrent{

    @PrimaryGeneratedColumn()
    recurrent_id : number;

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

    @Column({
        type : "int",
        length : 2,
    })
    recurrentPaymentStatus : number;

    @Column({type : "boolean",})
    isRecurrentPaymentExpired : boolean;

    @Column({type : "boolean",})
    allowEdit : boolean;

    @Column({
        type : "char",
        length : 20,
    })
    startDate : string;

    @Column({type : "int",})
    day : number;

    @Column({
        type : "char",
        length : 23,
        nullable : true
    })
    lastPaymentDate : string;

    @Column({
        type : "char",
        length : 23,
        nullable : true
    })
    nextPaymentDate : string;
    @Column({
        type : "char",
        length : 50,
        nullable : true
    })
    recurrentPaymentStatusDescription : string;
}