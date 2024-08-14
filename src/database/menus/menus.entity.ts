import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('menus')
export class MenusEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column()
  user: string;

  @Column({ type: 'json', nullable: true })
  meals: {
    sunday?: { type: number; recipe: string };
    monday?: { type: number; recipe: string };
    tuesday?: { type: number; recipe: string };
    wednesday?: { type: number; recipe: string };
    thursday?: { type: number; recipe: string };
    friday?: { type: number; recipe: string };
    saturday?: { type: number; recipe: string };
  };
}
