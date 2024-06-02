import { random_int } from "./random";

export function generate_url() : string{
    //const query = (value : any) => AppDataSource.manager.findOne(Product, {where : {short_url : value}});
    //let result : string = check_item(() => generate_word(7) ,query);

    return generate_word(7);
}

export function generate_word(size : number) : string{
    let result : string = '';
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    Array.from({length: size}).map((value) => {result += chars.charAt(random_int(chars.length))})
    return result;
}

export function generate_id() : string {
    const id_gen = () => generate_word(8)  + generate_word(4) + generate_word(4) + generate_word(4) + generate_word(12);
    //const query = (value : any) => AppDataSource.manager.findOne(Product, {where : {id : value}});
    //let generated_id : string = check_item(id_gen, query);
    return id_gen();
  }
