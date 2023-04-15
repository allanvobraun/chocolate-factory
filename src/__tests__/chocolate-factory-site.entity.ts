import 'reflect-metadata';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChocolateEntity } from './chocolate.entity';

@Entity()
export class ChocolateFactorySiteEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  tradeName!: string;

  @OneToMany(() => ChocolateEntity, chocolate => chocolate.factorySite)
  chocolates?: ChocolateEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
