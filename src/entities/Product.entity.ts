import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";


@Entity()
export class Product{
    @PrimaryColumn() id: string;
    @Column() order_number : string;
    @Column() name : string;
    @Column() type : string;
    @Column() description : string;
    @Column() show_description : boolean;
    @Column() price : number;
    @Column() weight : number;
    @Column() expiration_date  : string;
    @Column() max_number_of_Installments : number;
    @Column() quantity  : number;
    @Column() sku : string;
    @Column() soft_descriptor : string;
    @Column() shipping_type : string;
    @Column() shipping_name : string;
    @Column() shipping_price  : number;
    @Column() origin_zip_code : string;
    @Column() short_url : string;
    //@OneToOne(() => Recurrent) recurrent_id : Recurrent;
}