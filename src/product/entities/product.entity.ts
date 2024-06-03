import { Column, BeforeInsert, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn } from "typeorm";
import { Recurrent } from "./recurrent.entity";
import { nanoid } from "nanoid";
import { Shipping } from "./shipping.entity";

@Entity({ name: "products" })
export class Product {

    @PrimaryGeneratedColumn("uuid")
    id : string;

    @Column()
    OrderNumber : string;

    @Column()
    type : string;

    @Column()
    name : string;

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

    @OneToOne(() => Shipping)
    @JoinColumn()
    shipping : Shipping;

    @OneToOne(() => Recurrent)
    @JoinColumn()
    recurrent : Recurrent;

    @Column({nullable : true})
    short_url : string;

    @Column({nullable : true})
    showDescription : boolean;

    @Column({nullable : true})
    softDescriptor : string;

    @BeforeInsert()
    beforeInsert() {
        this.short_url = nanoid(7)
    }

}
