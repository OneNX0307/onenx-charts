import {Field} from './field';
import {ArrowInfo} from './arrow-info';

export class ChartInfo {
  constructor(public fields: Field[] = [], public arrows: ArrowInfo[] = []) {
  }
}
