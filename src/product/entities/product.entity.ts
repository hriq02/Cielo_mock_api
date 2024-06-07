import { Column, BeforeInsert, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn } from "typeorm";
import { nanoid } from "nanoid";

@Entity({ name: "products" })
export class Product {

    @PrimaryGeneratedColumn("uuid")
    id : string;

    @Column({
        type : "varchar",
        length : 64,
        nullable : true,
        default : nanoid(20).toLowerCase()
    })
    OrderNumber : string;

    @Column({
        type : "varchar",
        length : 255,
        nullable : true
    })
    type : string;

    @Column({
        type : "varchar",
        length : 128,
        nullable : false
    })
    name : string;

    @Column({
        type : "varchar",
        length : 256,
        nullable : true
    })
    description : string

    @Column({
        type : "integer",
        nullable : false
    })
    price : number;

    @Column({
        type : "integer",
        nullable : true
    })
    weight : number;

    @Column({
        type : "varchar",
        length : 20,
        nullable : true
    })
    expirationDate : string;

    @Column({
        type : "integer",
        nullable : true
    })
    maxNumberOfInstallments : number;

    @Column({
        type : "integer",
        nullable : true
    })
    quantity : number;

    @Column({
        type : "varchar",
        length : 32,
        nullable : true
    })
    sku : string;

    @Column({default: 0})
    shipping_id : number;

    @Column({default: 0})
    recurrent_id : number;

    @Column({
        type : "varchar",
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
        type : "varchar",
        length : 13,
        nullable : true
    })
    softDescriptor : string;

    @BeforeInsert()
    beforeInsert() {
        this.short_url = nanoid(7)
        this.OrderNumber
    }
}
