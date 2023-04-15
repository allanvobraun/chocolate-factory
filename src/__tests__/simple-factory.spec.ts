import { faker } from '@faker-js/faker';
import 'reflect-metadata';

import { describe, expect, expectTypeOf, it, Mock, vi } from 'vitest';
import {
  ChocolateFactorySiteFactory,
  COMPANY_NAME,
} from './factories/chocolate-factory-site.factory';
import { FactoryGuestFactory } from './factories/factory-guest.factory';
import { FactoryGuestEntity, FriendlyLevel } from './factory-guest.entity';

describe('simple factory tests', () => {
  it('make works', () => {
    const chocolateManufacturerFactory = new ChocolateFactorySiteFactory();
    const instance = chocolateManufacturerFactory.make();
    expectTypeOf(instance.name as string).toBeString();
  });

  it('state works', () => {
    const chocolateManufacturerFactory = new ChocolateFactorySiteFactory();
    const instance = chocolateManufacturerFactory
      .state(() => ({
        name: 'wonka',
      }))
      .make();
    expect(instance.name).toBe('wonka');
  });

  it('state works without callback', () => {
    const chocolateManufacturerFactory = new ChocolateFactorySiteFactory();
    const instance = chocolateManufacturerFactory
      .state({
        name: 'wonka',
      })
      .make();
    expect(instance.name).toBe('wonka');
  });

  it('state attributes from define works', () => {
    const chocolateManufacturerFactory = new ChocolateFactorySiteFactory();
    const instance = chocolateManufacturerFactory
      .state(attributes => ({
        tradeName: `${attributes.name ?? ''} company`,
      }))
      .make();
    expect(instance.tradeName).toBe(`${COMPANY_NAME} company`);
  });

  it('state attributes from state works', () => {
    const chocolateManufacturerFactory = new ChocolateFactorySiteFactory();
    const instance = chocolateManufacturerFactory
      .state({
        name: 'potato',
      })
      .state({
        name: 'hersheys',
      })
      .state(attributes => ({
        tradeName: `${attributes.name ?? ''} company`,
      }))
      .make();
    expect(instance.tradeName).toBe(`hersheys company`);
  });

  it('make attributes works', () => {
    const chocolateManufacturerFactory = new ChocolateFactorySiteFactory();
    const instance = chocolateManufacturerFactory.make({
      tradeName: 'hersheys company',
    });
    expect(instance.tradeName).toBe(`hersheys company`);
  });

  it('state works multiple times', () => {
    const chocolateManufacturerFactory = new ChocolateFactorySiteFactory();
    const instance = chocolateManufacturerFactory
      .state(() => ({
        name: 'wonka',
      }))
      .state(() => ({
        name: 'toblerone',
      }))
      .state(() => ({
        name: 'hersheys',
      }))
      .make();
    expect(instance.name).toBe('hersheys');
  });

  it('makeMany works', () => {
    const chocolateManufacturerFactory = new ChocolateFactorySiteFactory();
    const instances = chocolateManufacturerFactory
      .state(() => ({
        name: 'wonka',
      }))
      .state(() => ({
        name: 'toblerone',
      }))
      .state(() => ({
        name: 'hersheys',
      }))
      .makeMany(10);
    expect(instances).toHaveLength(10);
    instances.forEach(instance => {
      expect(instance.name).toBe('hersheys');
    });
  });

  it('makeMany mantain randoness', () => {
    const chocolateManufacturerFactory = new ChocolateFactorySiteFactory();
    const instances = chocolateManufacturerFactory
      .state(() => ({
        name: 'wonka ' + faker.random.alpha(4),
      }))
      .makeMany(10);
    expect(instances).toHaveLength(10);
    const set = new Set(instances.map(item => item.name));
    expect(set).toHaveLength(instances.length);
  });

  it('makeMany state works', () => {
    const chocolateManufacturerFactory = new ChocolateFactorySiteFactory();
    const instances = chocolateManufacturerFactory.makeMany(10, {
      name: 'wonka',
    });
    expect(instances).toHaveLength(10);
    instances.forEach(instance => {
      expect(instance.name).toBe('wonka');
    });
  });

  it('custom states works', () => {
    const chocolateGuestFactory = new FactoryGuestFactory();
    const instance = chocolateGuestFactory.overWeight().make();
    expect(instance).toMatchObject({
      name: 'Augustus Gloop',
      weight: 100,
      friendlyLevel: FriendlyLevel.UNFRIENDLY,
    });
  });

  it('after making hook is called', () => {
    let afterMakingCallbackSpy: Mock<[attributes: Partial<FactoryGuestEntity>], unknown> =
      vi.fn();
    vi.spyOn(FactoryGuestFactory.prototype, 'setAfterMaking').mockImplementation(
      function (this: FactoryGuestFactory, fn) {
        afterMakingCallbackSpy = vi.fn(fn);
        this['afterMakingCallback'] = afterMakingCallbackSpy;
      },
    );
    const verucaState = {
      id: 1,
      age: 8,
      name: 'Veruca Salt',
      friendlyLevel: FriendlyLevel.VERY_UNFRIENDLY,
      weight: 35,
    };

    const chocolateGuestFactory = new FactoryGuestFactory();
    chocolateGuestFactory.state(verucaState).make();
    expect(afterMakingCallbackSpy).toHaveBeenLastCalledWith(verucaState);
  });

  it('after making hook can do side effects', () => {
    const chocolateManufacturerFactory = new ChocolateFactorySiteFactory();
    const instance = chocolateManufacturerFactory.make();
    expect(instance.createdAt).toBeDefined();
  });

  it('one sequence works', () => {
    const chocolateGuestFactory = new FactoryGuestFactory();
    const instance = chocolateGuestFactory.make();
    expect(instance.id).toBe(1);
  });

  it('multiple sequences works', () => {
    const chocolateGuestFactory = new FactoryGuestFactory();
    const instances = chocolateGuestFactory.makeMany(10);
    for (let index = 0; index < instances.length; index++) {
      const element = instances[index];
      expect(element.id).toBe(index + 1);
    }
  });
});
