import 'reflect-metadata';

import { DataSource, Repository } from 'typeorm';
import { beforeAll, describe, expect, it } from 'vitest';
import { ChocolateFactorySiteEntity } from './chocolate-factory-site.entity';
import { ChocolateEntity } from './chocolate.entity';

describe('database tests', () => {
  let dataSource: DataSource;
  let chocolateManufacturerRepo: Repository<ChocolateFactorySiteEntity>;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [ChocolateEntity, ChocolateFactorySiteEntity],
    });
    await dataSource.initialize();

    chocolateManufacturerRepo = dataSource.getRepository(ChocolateFactorySiteEntity);
  });

  it('database works', async () => {
    const manufacturer = await chocolateManufacturerRepo.save({
      name: 'batata',
      tradeName: 'batata company',
    });

    expect(manufacturer.createdAt).toBeDefined();
  });
});
