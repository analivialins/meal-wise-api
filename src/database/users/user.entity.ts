import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @Column()
  name: string;

  @Column({unique:true})
  email: string;

  @Column({ name: "password" })
  password: string;

  @Column('json')
  informations: {
    weight: string;
    height: string;
    currentWeight: string;
    goalWeight: string;
  };
}
