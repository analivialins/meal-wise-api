import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('menus')
export class MenuEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @Column()
  type: number;

  @Column()
  name: string;

  @Column()
  totalCalories: number;

  @Column('json', { array: true })
  ingredients: {
    quantity: number;
    unity: number;
    description: string;
  }[];

  @Column('simple-array')
  prepares: string[];
}
