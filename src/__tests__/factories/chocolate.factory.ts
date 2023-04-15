import { Factory } from 'src/factory';
import type { ChocolateFactorySiteEntity } from '../chocolate-factory-site.entity';
import { ChocolateEntity } from '../chocolate.entity';

export class ChocolateFactory extends Factory<ChocolateEntity> {
  protected definition(): Partial<ChocolateFactorySiteEntity> {
    return {
      name: 'wonka bar',
    };
  }
}
