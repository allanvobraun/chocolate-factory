import { EntityTarget, ObjectLiteral } from 'typeorm';
import { range } from './util';

type Constructor<T> = new (...args: any[]) => T;
export const ENTITY_METADATA_KEY = 'CF:ENTITY_METADATA_KEY';

export function FactoryFor<Entity extends ObjectLiteral>(entity: EntityTarget<Entity>) {
  return function (constructor: Constructor<Factory<Entity>>) {
    Reflect.defineMetadata(ENTITY_METADATA_KEY, entity, constructor);
  };
}

export type StateFn<T> = (attributes: Partial<T>) => Partial<T>;
export abstract class Factory<T> {
  private states: StateFn<T>[] = [];

  protected abstract definition(): Partial<T>;

  make(state?: Partial<T>): Partial<T> {
    if (state) {
      return this.state(state).make();
    }

    return this.getRawAttributes();
  }

  makeMany(count: number, state?: Partial<T>): Partial<T>[] {
    if (count < 0) {
      throw new Error(`Times must be greater than 0, ${count} recived`);
    }
    return range(0, count).map(() => this.make(state));
  }

  state(state: StateFn<T> | Partial<T>): Factory<T> {
    if (state instanceof Function) {
      this.states.push(state);
      return this;
    }

    this.states.push(() => state);
    return this;
  }

  protected getRawAttributes(): Partial<T> {
    return this.states.reduce((carry, stateFn) => {
      const result = stateFn.call(this, carry);

      return {
        ...carry,
        ...result,
      };
    }, this.definition());
  }
}
