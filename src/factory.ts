import { EntityTarget, ObjectLiteral } from 'typeorm';

type Constructor<T> = new (...args: any[]) => T;
export const ENTITY_METADATA_KEY = 'CF:ENTITY_METADATA_KEY';

export function FactoryFor<Entity extends ObjectLiteral>(entity: EntityTarget<Entity>) {
  return function (constructor: Constructor<Factory<Entity>>) {
    Reflect.defineMetadata(ENTITY_METADATA_KEY, entity, constructor);
  };
}

type StateFn<T> = (attributes: Partial<T>) => Partial<T>;
export abstract class Factory<T> {
  private states: StateFn<T>[] = [];

  protected abstract definition(): Partial<T>;

  make(): Partial<T> {
    return this.getRawAttributes();
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
