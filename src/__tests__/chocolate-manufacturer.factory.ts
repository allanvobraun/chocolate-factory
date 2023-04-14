import { faker } from '@faker-js/faker';
import { Factory } from 'src/factory';
import type { ChocolateManufacturerEntity } from './chocolate-manufacturer.entity';

export const COMPANY_NAME = 'Wonka Ltda.';
export class ChocolateManufacturerFactory extends Factory<ChocolateManufacturerEntity> {
  protected definition(): Partial<ChocolateManufacturerEntity> {
    return {
      name: COMPANY_NAME,
      tradeName: faker.company.name(),
    };
  }
}
