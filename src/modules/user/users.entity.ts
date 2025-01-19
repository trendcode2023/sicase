import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;
  @Column({ type: 'varchar', length: 250, nullable: false })
  password: string;
}
