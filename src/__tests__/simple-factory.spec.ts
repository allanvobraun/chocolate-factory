import 'reflect-metadata';

import { describe, expect, expectTypeOf, it } from 'vitest';
import {
  ChocolateManufacturerFactory,
  COMPANY_NAME,
} from './chocolate-manufacturer.factory';

describe('simple factory tests', () => {
  it('make works', () => {
    const chocolateManufacturerFactory = new ChocolateManufacturerFactory();
    const instance = chocolateManufacturerFactory.make();
    expectTypeOf(instance.name as string).toBeString();
  });

  it('state works', () => {
    const chocolateManufacturerFactory = new ChocolateManufacturerFactory();
    const instance = chocolateManufacturerFactory
      .state(() => ({
        name: 'wonka',
      }))
      .make();
    expect(instance.name).toBe('wonka');
  });

  it('state works without callback', () => {
    const chocolateManufacturerFactory = new ChocolateManufacturerFactory();
    const instance = chocolateManufacturerFactory
      .state({
        name: 'wonka',
      })
      .make();
    expect(instance.name).toBe('wonka');
  });

  it('state attributes from define works', () => {
    const chocolateManufacturerFactory = new ChocolateManufacturerFactory();
    const instance = chocolateManufacturerFactory
      .state(attributes => ({
        tradeName: `${attributes.name ?? ''} company`,
      }))
      .make();
    expect(instance.tradeName).toBe(`${COMPANY_NAME} company`);
  });

  it('state attributes from state works', () => {
    const chocolateManufacturerFactory = new ChocolateManufacturerFactory();
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
    const chocolateManufacturerFactory = new ChocolateManufacturerFactory();
    const instance = chocolateManufacturerFactory.make({
      tradeName: 'hersheys company',
    });
    expect(instance.tradeName).toBe(`hersheys company`);
  });

  it('state works multiple times', () => {
    const chocolateManufacturerFactory = new ChocolateManufacturerFactory();
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
});
