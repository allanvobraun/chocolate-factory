import 'reflect-metadata';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ChocolateManufacturerEntity } from './chocolate-manufacturer.entity';

export enum SugarLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity({ name: 'chocolate' })
export class ChocolateEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text', default: SugarLevel.MEDIUM }) // We don't use enum type as it makes it easier when testing across different db drivers.
  sugarLevel!: SugarLevel;

  @OneToOne(() => ChocolateManufacturerEntity, manufacturer => manufacturer.chocolates)
  @JoinColumn()
  manufacturer!: ChocolateManufacturerEntity;

  @CreateDateColumn()
  createdAt!: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: string;
}
