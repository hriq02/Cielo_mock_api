import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity({ name: "recurrent" })
export class Recurrent{

    @PrimaryGeneratedColumn()
    recurrent_id : number;

    @Column({
        type : "varchar",
        length : 128,
        nullable : true
    })
    interval : string;

    @Column({
        type : "int",
        nullable : true
    })
    Amount : number;

    @Column({
        type : "varchar",
        length : 20,
        nullable : true
    })
    endDate : string;

    @Column({type : "integer",})
    recurrentPaymentStatus : number;

    @Column({type : "boolean", default:false})
    isRecurrentPaymentExpired : boolean;

    @Column({type : "boolean",default : true})
    allowEdit : boolean;

    @Column({
        type : "varchar",
        length : 20,
    })
    startDate : string;

    @Column({type : "integer",})
    day : number;

    @Column({
        type : "varchar",
        length : 23,
        nullable : true
    })
    lastPaymentDate : string;

    @Column({
        type : "varchar",
        length : 23,
        nullable : true
    })
    nextPaymentDate : string;

    @Column({
        type : "varchar",
        length : 50,
        nullable : true
    })
    recurrentPaymentStatusDescription : string;


    @BeforeInsert()
    beforeInsert() {
        this.recurrentPaymentStatus = 0;
        this.startDate = new Date().toISOString();
        this.day = new Date().getDate();

        this.update_next_payment_date();
        this.recurrentPaymentStatusDescription = "Pendente";        
    }

    
    public update_next_payment_date(){
        switch(this.interval){
            case "Monthly":
                this.nextPaymentDate = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();
            break;

            case "Bimonthly":
                this.nextPaymentDate = new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString();
            break;

            case "Quarterly":
                this.nextPaymentDate = new Date(new Date().setMonth(new Date().getMonth() + 4)).toISOString();
            break;
            
            case "SemiAnnual" :
                this.nextPaymentDate = new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString();
            break;

            case "Annual":
                this.nextPaymentDate = new Date(new Date().setMonth(new Date().getMonth() + 12)).toISOString();
            break;

            default:
                throw new Error("invalid interval");
            break;
        }
    }
}