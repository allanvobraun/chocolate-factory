import { faker } from '@faker-js/faker';
import { DefinitionParams, Factory } from 'src/factory';
import { FactoryGuestEntity, FriendlyLevel } from '../factory-guest.entity';

export class FactoryGuestFactory extends Factory<FactoryGuestEntity> {
  old() {
    return this.state(() => ({
      age: faker.datatype.number({
        min: 60,
        max: 90,
      }),
    }));
  }

  young() {
    return this.state(() => ({
      age: faker.datatype.number({
        min: 8,
        max: 18,
      }),
    }));
  }

  overWeight() {
    return this.state(() => ({
      name: 'Augustus Gloop',
      weight: 100,
      friendlyLevel: FriendlyLevel.UNFRIENDLY,
    }));
  }

  protected definition({
    afterMaking,
    sequence,
  }: DefinitionParams<FactoryGuestEntity>): Partial<FactoryGuestEntity> {
    afterMaking(() => {
      // side efects
    });

    return {
      id: sequence,
      name: faker.name.fullName(),
      friendlyLevel: faker.datatype.number({
        min: 1,
        max: 5,
      }),
      weight: faker.datatype.number({
        min: 30,
        max: 100,
      }),
      age: faker.datatype.number({
        min: 8,
        max: 90,
      }),
    };
  }
}
