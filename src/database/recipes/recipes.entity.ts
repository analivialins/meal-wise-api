import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('recipes')
export class RecipesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @Column()
  name: string;

  @Column()
  totalCalories: number;

  @Column()
  cover: number;

  @Column('jsonb')
  ingredients: {
    quantity: number;
    unity: number;
    description: string;
  }[];

  @Column('simple-array')
  prepares: string[];

  @Column({ nullable: false })
  user: string;
  
}
