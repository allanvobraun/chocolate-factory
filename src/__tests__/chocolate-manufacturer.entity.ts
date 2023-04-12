import 'reflect-metadata';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChocolateEntity } from './chocolate.entity';

export enum SugarLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity({ name: 'chocolate' })
export class ChocolateManufacturerEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => ChocolateEntity, chocolate => chocolate.manufacturer)
  chocolates?: ChocolateEntity[];

  @CreateDateColumn()
  createdAt!: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: string;
}
