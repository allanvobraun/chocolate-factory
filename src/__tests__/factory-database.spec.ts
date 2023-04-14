import 'reflect-metadata';
import { Factory, FactoryFor } from 'src/factory';

import { DataSource, DeepPartial, Repository } from 'typeorm';
import { expect, it, describe, beforeAll } from 'vitest';
import { ChocolateManufacturerEntity } from './chocolate-manufacturer.entity';
import { ChocolateEntity } from './chocolate.entity';

describe('database tests', () => {
  let dataSource: DataSource;
  let chocolateRepo: Repository<ChocolateEntity>;
  let chocolateManufacturerRepo: Repository<ChocolateManufacturerEntity>;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [ChocolateEntity, ChocolateManufacturerEntity],
    });
    await dataSource.initialize();

    chocolateRepo = dataSource.getRepository(ChocolateEntity);
    chocolateManufacturerRepo = dataSource.getRepository(ChocolateManufacturerEntity);
  });

  it('database works', async () => {
    const manufacturer = await chocolateManufacturerRepo.save({
      name: 'batata',
    });

    console.log(manufacturer);

    expect(manufacturer.createdAt).toBeDefined();
  });
});
