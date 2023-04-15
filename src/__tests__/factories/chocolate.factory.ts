import { Factory } from 'src/factory';
import { ChocolateEntity } from '../chocolate.entity';

export class ChocolateFactory extends Factory<ChocolateEntity> {
  protected definition(): Partial<ChocolateEntity> {
    return {
      name: 'wonka bar',
    };
  }
}
