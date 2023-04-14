import 'reflect-metadata';

import { describe, expect, expectTypeOf, it } from 'vitest';
import { ChocolateManufacturerFactory } from './chocolate-manufacturer.factory';

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
    expectTypeOf(instance.name as string).toBeString();
    expect(instance.name).toBe('wonka');
  });

  it('state works without callbak', () => {
    const chocolateManufacturerFactory = new ChocolateManufacturerFactory();
    const instance = chocolateManufacturerFactory
      .state({
        name: 'wonka',
      })
      .make();
    expectTypeOf(instance.name as string).toBeString();
    expect(instance.name).toBe('wonka');
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
        name: 'hersheis',
      }))
      .make();
    expectTypeOf(instance.name as string).toBeString();
    expect(instance.name).toBe('hersheis');
  });
});
