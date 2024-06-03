import { Column, BeforeInsert, PrimaryGeneratedColumn, Entity, OneToOne } from "typeorm";
import { Recurrent_model } from "./recurrent.entity";
import { nanoid } from "nanoid";
import { Shipping_model } from "./shipping.entity";

@Entity({ name: "products" })
export class Product {

    @PrimaryGeneratedColumn("uuid")
    id : string

    @Column()
    OrderNumber : number;

    @Column()
    type : string

    @Column()
    name : string

    @Column()
    description : string

    @Column()
    price : number;

    @Column()
    weight : number;

    @Column()
    expirationDate : string;

    @Column()
    maxNumberOfInstallments : number;

    @Column()
    quantity : number;

    @Column()
    sku : string;

    @OneToOne(() => Shipping_model)
    shipping : Shipping_model

    @OneToOne(() => Recurrent_model)
    recurrent : Recurrent_model

    @Column()
    short_url : string;

    @BeforeInsert()
    beforeInsert() {
        this.short_url = nanoid(7)
    }

}
