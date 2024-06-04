import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("Tokens")
export class Token {
    @PrimaryColumn()
    acces_token : string;
}
