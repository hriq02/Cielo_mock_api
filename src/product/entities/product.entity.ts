import { Column, BeforeInsert, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn } from "typeorm";
import { Recurrent } from "../../recurrent/entities/recurrent.entity";
import { nanoid } from "nanoid";
import { Shipping } from "./shipping.entity";

@Entity({ name: "products" })
export class Product {

    @PrimaryGeneratedColumn("uuid")
    id : string;

    @Column({
        type : "char",
        length : 64,
        nullable : true
    })
    OrderNumber : string;

    @Column({
        type : "char",
        length : 255,
        nullable : true
    })
    type : string;

    @Column({
        type : "char",
        length : 128,
        nullable : false
    })
    name : string;

    @Column({
        type : "char",
        length : 256,
        nullable : true
    })
    description : string

    @Column({
        type : "integer",
        length : 1000000,
        nullable : false
    })
    price : number;

    @Column({
        type : "integer",
        length : 2000000,
        nullable : true
    })
    weight : number;

    @Column({
        type : "char",
        length : 20,
        nullable : true
    })
    expirationDate : string;

    @Column({
        type : "integer",
        length : 2,
        nullable : true
    })
    maxNumberOfInstallments : number;

    @Column({
        type : "integer",
        length : 2,
        nullable : true
    })
    quantity : number;

    @Column({
        type : "char",
        length : 32,
        nullable : true
    })
    sku : string;

    @Column()
    shipping_id : number;

    @Column()
    recurrent_id : number;

    @Column({
        type : "char",
        length : 7,
        nullable : true
    })
    short_url : string;

    @Column({
        type : "boolean",
        nullable : true
    })
    showDescription : boolean;

    @Column({
        type : "char",
        length : 13,
        nullable : true
    })
    softDescriptor : string;

    @BeforeInsert()
    beforeInsert() {
        this.short_url = nanoid(7)
    }

}
