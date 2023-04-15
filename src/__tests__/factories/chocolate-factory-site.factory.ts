import { faker } from '@faker-js/faker';
import { DefinitionParams, Factory } from 'src/factory';
import type { ChocolateFactorySiteEntity } from '../chocolate-factory-site.entity';

export const COMPANY_NAME = 'Wonka Ltda.';
export class ChocolateFactorySiteFactory extends Factory<ChocolateFactorySiteEntity> {
  protected definition({
    afterMaking,
  }: DefinitionParams<ChocolateFactorySiteEntity>): Partial<ChocolateFactorySiteEntity> {
    afterMaking(attrs => {
      attrs.createdAt = new Date();
    });
    return {
      name: COMPANY_NAME,
      tradeName: faker.company.name(),
    };
  }
}
