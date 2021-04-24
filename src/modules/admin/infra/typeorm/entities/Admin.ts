import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('admins')
class Admin {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}


export default Admin;
