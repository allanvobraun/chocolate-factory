import 'reflect-metadata';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum FriendlyLevel {
  VERY_UNFRIENDLY = 1,
  UNFRIENDLY = 2,
  NEUTRAL = 3,
  FRIENDLY = 4,
  VERY_FRIENDLY = 5,
}

@Entity()
export class FactoryGuestEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  age!: number;

  @Column()
  weight!: number; // in kg

  @Column('integer')
  friendlyLevel!: FriendlyLevel; // on a scale of 1-5, with 5 being the friendliest
}
