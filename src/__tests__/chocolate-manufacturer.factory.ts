import { faker } from '@faker-js/faker';
import { Factory } from 'src/factory';
import type { ChocolateManufacturerEntity } from './chocolate-manufacturer.entity';

export class ChocolateManufacturerFactory extends Factory<ChocolateManufacturerEntity> {
  protected definition(): Partial<ChocolateManufacturerEntity> {
    return {
      name: faker.company.name(),
    };
  }
}
