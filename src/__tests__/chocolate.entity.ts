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

import { ChocolateFactorySiteEntity } from './chocolate-factory-site.entity';

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

  @OneToOne(() => ChocolateFactorySiteEntity, manufacturer => manufacturer.chocolates)
  @JoinColumn()
  factorySite!: ChocolateFactorySiteEntity;

  @CreateDateColumn()
  createdAt!: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: string;
}
