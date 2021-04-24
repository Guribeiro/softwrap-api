import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('customers')
class Customer {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({type: 'integer'})
  age: number;

  @Column()
  marital_status: string;

  @Column()
  cpf: string;

  @Column()
  city: string;

  @Column()
  state: string;
}


export default Customer;
